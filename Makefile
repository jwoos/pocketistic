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

# ubuntu 14.04
port-reroute:
	sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080

# ubuntu 16.10
port-reroute-new:
	sudo iptables -t nat -A OUTPUT -o lo -p tcp --dport 80 -j REDIRECT --to-port 8080

migration:
	sequelize db:migrate --config config.js

undo-migration:
	sequelize db:migrate:undo:all --config config.js

generate-migration:
	sequelize migration:create --name ${NAME} --config config.js

generate-model:
	sequelize model:create --name ${NAME} --attributes ${ATTRIBUTES} --config config.js
