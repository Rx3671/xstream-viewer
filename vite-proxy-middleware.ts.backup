import type { Plugin } from 'vite';

export function xtreamProxyPlugin(): Plugin {
  return {
    name: 'xtream-proxy',
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

          console.log('Proxying request to:', targetUrl);

          // Determine if this is a streaming request (m3u8, ts, mp4, etc.)
          const isStreamingRequest = /\.(m3u8|ts|mp4|mkv|avi|flv)(\?.*)?$/i.test(targetUrl);

          try {
            const response = await fetch(targetUrl, {
              method: 'GET',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': isStreamingRequest ? '*/*' : 'application/json',
                'Connection': 'keep-alive',
                'Range': req.headers.range || '',
              },
            });
            
            console.log('Response status:', response.status);

            if (!response.ok && response.status !== 206) {
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: `Server returned ${response.status}: ${response.statusText}` 
              }));
              return;
            }

            // For streaming requests, pipe the response directly
            if (isStreamingRequest) {
              res.statusCode = response.status;
              
              // Copy all relevant headers from the original response
              const headersToForward = [
                'content-type',
                'content-length',
                'content-range',
                'accept-ranges',
                'cache-control',
                'etag',
                'last-modified',
              ];

              headersToForward.forEach(header => {
                const value = response.headers.get(header);
                if (value) {
                  res.setHeader(header, value);
                }
              });

              // Enable CORS for streaming
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Range');

              // Stream the response body
              if (response.body) {
                const reader = response.body.getReader();
                const pump = async () => {
                  try {
                    while (true) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      if (!res.write(value)) {
                        // If write returns false, wait for drain event
                        await new Promise(resolve => res.once('drain', resolve));
                      }
                    }
                    res.end();
                  } catch (error) {
                    console.error('Streaming error:', error);
                    res.end();
                  }
                };
                pump();
              } else {
                res.end();
              }
            } else {
              // For JSON API requests
              const data = await response.json();
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify(data));
            }
          } catch (fetchError: any) {
            console.error('Fetch error:', fetchError);
            
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
