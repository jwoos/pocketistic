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
