#! /usr/bin/env bash

declare -a containers=(
	'jwoos/pocketistic-base'
	#'jwoos/pocketistic-backend'
	#'jwoos/pocketistic-frontend'
	#'jwoos/pocketistic-postgres'
	#'jwoos/pocketistic-redis'
)

for container in "${containers[@]}"; do
	docker build -t jwoos/pocketistic-base .
done
