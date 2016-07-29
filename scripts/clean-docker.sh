#! /usr/bin/env bash

echo 'Removing running containers'
docker ps -qf status=exited | xargs -r docker rm

echo 'Removing volumes'
docker volume ls -qf "dangling=true" | xargs -r docker volume rm

echo 'Removing images'
docker images -qf "dangling=true"  | xargs -r docker rmi

echo 'Removing networks'
# There is no "dangling=true" for networks.
docker network ls -qf type=custom | xargs docker network rm
