WEB_PID = $(shell docker-compose ps -q web)
DB_PID = $(shell docker-compose ps -q db)

default:
	cat Makefile

psql:
	sudo -u postgres psql pocketistic

debug:
	DEBUG=pocketistic:* npm start

heroku-bash:
	heroku run --app sheltered-badlands-26515 bash

heroku-psql:
	heroku pg:psql --app sheltered-badlands-26515 DATABASE

migration:
	sequelize db:migrate --config config.js

undo-migration:
	sequelize db:migrate:undo:all --config config.js

generate-migration:
	sequelize migration:create --name ${NAME} --config config.js

generate-model:
	sequelize model:create --name ${NAME} --attributes ${ATTRIBUTES} --config config.js

build-web:
	docker-compose build -t jwoos/pocketistic-web:latest

push-web:
	docker push jwoos/pocketistic-web

build-db:
	docker-compose build -t jwoos/pocketistic-db:latest

push-db:
	docker push jwoos/pocketistic-db

docker-migration:
	docker exec -it ${WEB_PID} bash -c 'make migration'

docker-undo-migration:
	docker exec -it ${WEB_PID} bash -c 'make undo-migration'

docker-generate-migration:
	docker exec -it ${WEB_PID} bash -c 'make generate-migration'

docker-generate-model:
	docker exec -it ${WEB_PID} bash -c 'make generate-model'

docker-psql:
	docker exec -it ${DB_PID} psql -U postgres pocketistic
