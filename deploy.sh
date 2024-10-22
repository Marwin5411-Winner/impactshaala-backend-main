#!/bin/bash
#export GIT_ASKPASS="~/home/ubuntu/.netrc"
#git pull
npm install .
pm2 start index.js --name impactshaala-backend --namespace stage
pm2 restart index.js
pm2 save
