#!/bin/sh
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

docker compose -f "docker-compose-db.yaml" up -d --build
cd backend
npx prisma migrate dev