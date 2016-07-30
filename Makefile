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
