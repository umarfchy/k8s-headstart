# Makefile

# constants
DOCKER_REPOSITORY=umarfchy
API_URL=http://api.example.com

# Define Docker image names
CLIENT_IMAGE_NAME=client
API_IMAGE_NAME=api
DB_IMAGE_NAME=db

# Define build and deploy targets
.PHONY: build-api build-db build-all deploy-api deploy-db

# Default goal
build: build-all
push: push-all
deploy: deploy-all

# BUILD Commands

# Build the CLIENT Docker image
build-client:
	@cd ./client && docker build --build-arg VITE_API_URL=${API_URL} -t ${DOCKER_REPOSITORY}/$(CLIENT_IMAGE_NAME) .

# Build the API Docker image
build-api:
	@cd ./api && docker build -t ${DOCKER_REPOSITORY}/$(API_IMAGE_NAME) .

# Build the DB Docker image
build-db:
	@cd ./db && docker build -t ${DOCKER_REPOSITORY}/$(DB_IMAGE_NAME) .

# Build all images in parallel
build-all: build-client build-api build-db

# PUSH Commands

# Build the CLIENT Docker image
push-client:
	@docker push ${DOCKER_REPOSITORY}/$(CLIENT_IMAGE_NAME)

# Build the API Docker image
push-api:
	@docker push ${DOCKER_REPOSITORY}/$(API_IMAGE_NAME)

# Build the DB Docker image
push-db:
	@docker push ${DOCKER_REPOSITORY}/$(DB_IMAGE_NAME)

# Build all images in parallel
push-all: push-client push-api push-db

# DEPLOY Commands

# Deploy CLIENT Kubernetes manifests
deploy-client:
	@cd ./k8s/client && kubectl apply -f k8s.yaml

# Deploy API Kubernetes manifests
deploy-api:
	@cd ./k8s/api && kubectl apply -f k8s.yaml

# Deploy DB Kubernetes manifests
deploy-db:
	@cd ./k8s/db && kubectl apply -f pv.yaml
	@cd ./k8s/db && kubectl apply -f k8s.yaml

deploy-all: deploy-client deploy-api deploy-db