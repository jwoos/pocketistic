#! /usr/bin/env bash

# make sure to update your containers

containers=( $(docker ps -q) )

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

if [[ $# -eq 0 ]]; then
	echo "
	Please provide commands enclose in quotations
	example:
		./scripts/check-containers.sh 'echo this' 'echo that'
	"
	exit 1
fi

for container in ${containers[@]}; do
	echo
	echo '===================================================================================================='

	echo
	docker ps -f "id=${container}"
	echo

	echo
	for command in "$@"; do
		echo -e "COMMAND: ${command}"
		docker exec -it ${container} ${command}
		echo
	done

	echo '===================================================================================================='
	echo
done
