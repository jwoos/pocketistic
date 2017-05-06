#!/usr/bin/env bash

set -e
cmd="$@"

until PGPASSWORD=1234567890 psql -h 'db' -U 'postgres' -W -d pocketistic -c '\d'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
