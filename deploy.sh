#!/bin/bash
echo "Pulling latest changes from GitHub..."
cd /var/www/highlandsproject.com

# Ensure no local changes
git reset --hard origin/main

# Pull the latest code
git pull origin main

# Install dependencies
npm install

# Restart the Node.js server (adjust if using PM2)
pm2 restart highlandsproject || pm2 start server.js --name highlandsproject

echo "Deployment complete!"
