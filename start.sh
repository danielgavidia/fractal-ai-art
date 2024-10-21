#!/bin/sh
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

docker image prune -a -f
docker compose down
docker compose build --no-cache
docker compose up -d