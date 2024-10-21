#!/bin/sh
docker image prune -a -f
docker compose down
docker compose up