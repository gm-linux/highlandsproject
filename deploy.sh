#!/bin/bash

set -e

cd /var/www/highlandsproject.com

echo "---- Deploy started at $(date) ----" >> /var/www/highlandsproject.com/deploy.log

# Reset repo
git reset --hard HEAD
git clean -fd
git pull origin main

# Backend install (clean)
npm ci --omit=dev

# Restart correct PM2 services
pm2 restart highlands-backend || pm2 start server.js --name highlands-backend
pm2 restart highlands-webhook || pm2 start webhook.js --name highlands-webhook
pm2 save

# Reload apache ONLY if needed (optional)
# sudo systemctl reload apache2

echo "---- Deploy finished at $(date) ----" >> /var/www/highlandsproject.com/deploy.log
