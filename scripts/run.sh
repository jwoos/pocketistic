#!/usr/bin/env bash

./scripts/wait-for-postgres.sh

make migration && yarn start
