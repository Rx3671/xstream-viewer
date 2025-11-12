import type { Plugin } from 'vite';

export function xtreamProxyPlugin(): Plugin {
  return {
    name: 'xtream-proxy-optimized',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/xtream-proxy')) {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const targetUrl = url.searchParams.get('url');
          
          if (!targetUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'URL parameter is required' }));
            return;
          }

          console.log('🔄 Proxying request to:', targetUrl);

          // Determine content type from URL
          const isM3U8 = targetUrl.endsWith('.m3u8') || targetUrl.includes('.m3u8?');
          const isTS = targetUrl.endsWith('.ts') || targetUrl.includes('.ts?');
          const isStreamingRequest = isM3U8 || isTS || /\.(mp4|mkv|avi|flv)(\?.*)?$/i.test(targetUrl);

          try {
            // Prepare upstream headers
            const upstreamHeaders: Record<string, string> = {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': isStreamingRequest ? '*/*' : 'application/json',
              'Connection': 'keep-alive',
              'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
            };

            // Forward Range header for partial content (important for seeking)
            if (req.headers.range) {
              upstreamHeaders['Range'] = req.headers.range as string;
            }

            const response = await fetch(targetUrl, {
              method: 'GET',
              headers: upstreamHeaders,
            });
            
            console.log('📡 Response status:', response.status);

            if (!response.ok && response.status !== 206) {
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: `Server returned ${response.status}: ${response.statusText}` 
              }));
              return;
            }

            // ==================== STREAMING CONTENT HANDLING ====================
            
            if (isStreamingRequest) {
              res.statusCode = response.status;
              
              // Get content type
              const contentType = response.headers.get('content-type') || 
                                 (isM3U8 ? 'application/vnd.apple.mpegurl' : 
                                  isTS ? 'video/mp2t' : 'application/octet-stream');

              // Forward important headers
              const headersToForward = [
                'content-type',
                'content-length',
                'content-range',
                'accept-ranges',
                'etag',
                'last-modified',
              ];

              headersToForward.forEach(header => {
                const value = response.headers.get(header);
                if (value) {
                  res.setHeader(header, value);
                }
              });

              // ==================== CORS HEADERS ====================
              
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
              res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');

              // ==================== CACHING STRATEGY ====================
              
              if (isM3U8) {
                // M3U8 playlists should NOT be cached (they update frequently for live streams)
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', '0');
                console.log('📋 M3U8 playlist - no caching');
              } else if (isTS) {
                // TS segments are immutable once created - aggressive caching
                res.setHeader('Cache-Control', 'public, max-age=3600, immutable');
                console.log('📦 TS segment - caching enabled (1 hour)');
              } else {
                // Other streaming content - moderate caching
                res.setHeader('Cache-Control', 'public, max-age=300');
              }

              // ==================== M3U8 URL REWRITING ====================
              
              if (isM3U8 || contentType.includes('mpegurl')) {
                const text = await response.text();
                
                // Check for geo-blocking
                if (text.includes('country-not-allow') || text.includes('not-allow')) {
                  console.error('❌ Geographic restriction detected');
                  res.statusCode = 403;
                  res.end('Geographic restriction: Stream not available in your region');
                  return;
                }

                // Rewrite URLs to go through proxy
                const lines = text.split('\n');
                const modifiedLines = lines.map(line => {
                  if (line.trim() && !line.startsWith('#')) {
                    // Make relative URLs absolute
                    let absoluteUrl = line.trim();
                    if (!absoluteUrl.startsWith('http')) {
                      const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1);
                      absoluteUrl = baseUrl + absoluteUrl;
                    }
                    // Proxy the URL
                    return `/api/xtream-proxy?url=${encodeURIComponent(absoluteUrl)}`;
                  }
                  return line;
                });
                
                res.end(modifiedLines.join('\n'));
                console.log('✅ M3U8 playlist processed and URLs rewritten');
                return;
              }

              // ==================== BINARY STREAMING (TS SEGMENTS) ====================
              
              // Stream binary content efficiently
              if (response.body) {
                const reader = response.body.getReader();
                
                const pump = async () => {
                  try {
                    while (true) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      
                      // Handle backpressure
                      if (!res.write(value)) {
                        await new Promise(resolve => res.once('drain', resolve));
                      }
                    }
                    res.end();
                    console.log('✅ Stream completed successfully');
                  } catch (error) {
                    console.error('❌ Streaming error:', error);
                    res.end();
                  }
                };
                
                pump();
              } else {
                res.end();
              }
              
            } else {
              // ==================== JSON API RESPONSES ====================
              
              const data = await response.json();
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              
              // Cache API responses for 5 minutes
              res.setHeader('Cache-Control', 'public, max-age=300');
              
              res.end(JSON.stringify(data));
              console.log('✅ JSON response sent');
            }
            
          } catch (fetchError: any) {
            console.error('❌ Fetch error:', fetchError);
            
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
              error: fetchError.message || 'Failed to fetch from Xtream server' 
            }));
          }
        } else {
          next();
        }
      });
    },
  };
}
