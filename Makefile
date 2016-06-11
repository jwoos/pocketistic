default:
	cat Makefile

psql:
	sudo -u postgres psql pocketistic

debug:
	DEBUG=pocketistic*: npm start

heroku-bash:
	heroku run --app sheltered-badlands-26515 bash
