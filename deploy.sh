#!/bin/bash

set -euo pipefail

DEPLOY_DIR="/var/www/highlandsproject.com"
LOG_FILE="$DEPLOY_DIR/deploy.log"

echo "---- DEPLOYMENT STARTED at $(date) ----" | tee -a "$LOG_FILE"

cd "$DEPLOY_DIR" || exit 1

# Reset & Pull latest changes
echo "[Git] Resetting and pulling latest code" | tee -a "$LOG_FILE"
git reset --hard HEAD >> "$LOG_FILE" 2>&1
git clean -fd >> "$LOG_FILE" 2>&1
git pull origin main >> "$LOG_FILE" 2>&1

# Backend dependencies
echo "[NPM] Installing production dependencies" | tee -a "$LOG_FILE"
npm ci --omit=dev >> "$LOG_FILE" 2>&1

# Restart PM2 Services
echo "[PM2] Restarting highlands-backend" | tee -a "$LOG_FILE"
pm2 restart highlands-backend || pm2 start server.js --name highlands-backend >> "$LOG_FILE" 2>&1

echo "[PM2] Restarting highlands-webhook" | tee -a "$LOG_FILE"
pm2 restart highlands-webhook || pm2 start webhook.js --name highlands-webhook >> "$LOG_FILE" 2>&1

pm2 save >> "$LOG_FILE" 2>&1

# Apache reload (optional)
# echo "[Apache] Reloading Apache" | tee -a "$LOG_FILE"
# sudo systemctl reload apache2

echo "---- DEPLOYMENT FINISHED at $(date) ----" | tee -a "$LOG_FILE"
