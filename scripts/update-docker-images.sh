#! /usr/bin/env bash

declare -a containers=('node' 'nginx' 'postgres' 'ubuntu' 'jwoos/pocketistic-base')

for container in "${containers[@]}"; do
	docker pull "$container"
done
