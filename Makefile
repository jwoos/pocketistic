default:
	cat Makefile

docker-build-base:
	docker build -t jwoos/pocketistic-base:latest .

docker-push-base:
	docker push jwoos/pocketistic-base

docker-build-backend:
	docker build -t jwoos/pocketistic-backend:latest ./backend

docker-push-backend:
	docker push jwoos/pocketistic-backend

docker-pull-latest:
	docker pull jwoos/pocketistic-base
	docker pull jwoos/pocketistic-backend
