#!/bin/bash

# Script to apply streaming optimizations to IPTV Smart Player
# Usage: ./apply-optimizations.sh [dev|prod]

set -e

MODE=${1:-dev}

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 IPTV Smart Player - Applying Optimizations           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}📦 Step 1: Installing dependencies...${NC}"
if ! pnpm list compression &> /dev/null; then
    pnpm add compression
    echo -e "${GREEN}✅ compression installed${NC}"
else
    echo -e "${YELLOW}⚠️  compression already installed${NC}"
fi

if ! pnpm list @types/compression &> /dev/null; then
    pnpm add -D @types/compression
    echo -e "${GREEN}✅ @types/compression installed${NC}"
else
    echo -e "${YELLOW}⚠️  @types/compression already installed${NC}"
fi

echo ""

# Step 2: Backup original files
echo -e "${BLUE}💾 Step 2: Backing up original files...${NC}"

if [ ! -f "server/index.ts.backup" ]; then
    cp server/index.ts server/index.ts.backup
    echo -e "${GREEN}✅ server/index.ts backed up${NC}"
else
    echo -e "${YELLOW}⚠️  Backup already exists${NC}"
fi

if [ ! -f "vite-proxy-middleware.ts.backup" ]; then
    cp vite-proxy-middleware.ts vite-proxy-middleware.ts.backup
    echo -e "${GREEN}✅ vite-proxy-middleware.ts backed up${NC}"
else
    echo -e "${YELLOW}⚠️  Backup already exists${NC}"
fi

echo ""

# Step 3: Apply optimizations based on mode
if [ "$MODE" = "dev" ]; then
    echo -e "${BLUE}🔧 Step 3: Applying DEVELOPMENT optimizations...${NC}"
    
    # Apply vite middleware optimizations
    cp vite-proxy-middleware-optimized.ts vite-proxy-middleware.ts
    echo -e "${GREEN}✅ vite-proxy-middleware.ts updated${NC}"
    
    echo ""
    echo -e "${GREEN}✅ Development optimizations applied!${NC}"
    echo ""
    echo -e "${YELLOW}To start the dev server with optimizations:${NC}"
    echo -e "  pnpm run dev"
    
elif [ "$MODE" = "prod" ]; then
    echo -e "${BLUE}🔧 Step 3: Applying PRODUCTION optimizations...${NC}"
    
    # Apply server optimizations
    cp server/index-optimized.ts server/index.ts
    echo -e "${GREEN}✅ server/index.ts updated${NC}"
    
    # Apply vite middleware optimizations (for build)
    cp vite-proxy-middleware-optimized.ts vite-proxy-middleware.ts
    echo -e "${GREEN}✅ vite-proxy-middleware.ts updated${NC}"
    
    echo ""
    echo -e "${BLUE}📦 Step 4: Building for production...${NC}"
    pnpm run build
    echo -e "${GREEN}✅ Build completed${NC}"
    
    echo ""
    echo -e "${GREEN}✅ Production optimizations applied!${NC}"
    echo ""
    echo -e "${YELLOW}To start the production server:${NC}"
    echo -e "  pnpm run start"
    echo ""
    echo -e "${YELLOW}For Nginx deployment:${NC}"
    echo -e "  1. Copy nginx-optimized.conf to /etc/nginx/sites-available/"
    echo -e "  2. Create cache directories: sudo mkdir -p /var/cache/nginx/{segments,api}"
    echo -e "  3. Test config: sudo nginx -t"
    echo -e "  4. Restart Nginx: sudo systemctl restart nginx"
    
else
    echo -e "${YELLOW}❌ Invalid mode: $MODE${NC}"
    echo -e "Usage: ./apply-optimizations.sh [dev|prod]"
    exit 1
fi

echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo -e "  See STREAMING_OPTIMIZATION_GUIDE.md for details"
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Optimizations Applied Successfully!                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
