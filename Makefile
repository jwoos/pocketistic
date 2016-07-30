default:
	cat Makefile

docker-build-base:
	docker build -t jwoos/pocketistic-base:latest .

docker-push-base:
	docker push jwoos/pocketistic-base
