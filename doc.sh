#!/usr/bin/env bash

docker run -d -p 27017:27017 mongo
docker stop $(docker ps -q)

docker volume prune <<< "y"
docker system prune <<< "y"
echo ""