#!/bin/sh
# Prisma migration
cd backend
npx prisma generate
npx prisma db push
npx prisma migrate deploy

# Start frontend and backend containers
cd ..
docker container prune -f
docker image prune -f
docker compose up -d --build

# Changes