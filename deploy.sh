#!/bin/bash

set -e

cd /var/www/highlandsproject.com

echo "---- Deploy started at $(date) ----" >> /var/www/highlandsproject.com/deploy.log

git reset --hard HEAD
git clean -fd
git pull origin main

# Backend
npm install

cd ..

# Restart backend + webhook
pm2 restart backend || pm2 start server.js --name backend
pm2 restart deployer || pm2 start webhook.js --name deployer
pm2 save

sudo systemctl reload apache2

echo "---- Deploy finished at $(date) ----" >> /var/www/highlandsproject.com/deploy.log
