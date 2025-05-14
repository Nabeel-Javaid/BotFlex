#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deploying Clay Webhook App to Vercel${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Build the app
echo -e "${GREEN}Building application...${NC}"
npm run build

# Deploy to Vercel
echo -e "${GREEN}Deploying to Vercel...${NC}"
vercel --prod

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${YELLOW}IMPORTANT:${NC} Share your Vercel deployment URL with your friend"
echo -e "${YELLOW}Your friend should send data to:${NC} https://your-app.vercel.app/api/clay-webhook"
echo -e "${GREEN}========================================${NC}" 