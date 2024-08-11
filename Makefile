.PHONY: compose-build
compose-build:
	docker compose build

.PHONY: compose-up
compose-up:
	docker compose up

.PHONY: docker-build-all
docker-build-all:
	docker build -t client-react-dev -f Dockerfile.1 .
	docker build -t client-react-ngnix -f Dockerfile.2 .