#!/bin/bash

set -e  # Stop on errors

cd /var/www/highlandsproject.com

echo "---- Deploy started at $(date) ----" >> /var/log/deploy.log

git reset --hard HEAD
git clean -fd
git pull origin main

# Backend
npm install

# Frontend
cd frontend
npm install
npm run build

# Deploy built frontend
rm -rf ../public
mv build ../public

cd ..

# Reload services
pm2 restart deployer || pm2 start webhook.js --name deployer
sudo systemctl reload apache2

echo "---- Deploy finished at $(date) ----" >> /var/log/deploy.log
