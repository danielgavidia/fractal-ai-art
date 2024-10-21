#!/bin/sh
docker image prune -a -f
docker compose down
docker compose build --no-cache
docker compose up -d