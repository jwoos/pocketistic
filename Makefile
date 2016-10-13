default:
	cat Makefile

psql:
	sudo -u postgres psql pocketistic

debug:
	DEBUG=pocketistic* npm start

heroku-bash:
	heroku run --app sheltered-badlands-26515 bash

heroku-psql:
	heroku pg:psql --app sheltered-badlands-26515 DATABASE

port-reroute:
	sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080

migration:
	sequelize db:migrate

undo-migration:
	sequelize db:migrate:undo:all

generate-migration:
	sequelize migration:create --name ${NAME}

generate-model:
	sequelize model:create --name ${NAME} --attributes ${ATTRIBUTES}
