# Makefile

# Define Docker image names
API_IMAGE_NAME=api
DB_IMAGE_NAME=db

# Define build and deploy targets
.PHONY: build-api build-db build-all deploy-api deploy-db

# Default goal
build: build-all
deploy: deploy-all

# Build the API Docker image
build-api:
	@cd ./api && docker build -t $(API_IMAGE_NAME) .

# Build the DB Docker image
build-db:
	@cd ./db && docker build -t $(DB_IMAGE_NAME) .

# Build all images in parallel
build-all: build-api build-db

# Deploy API Kubernetes manifests
deploy-api:
	@cd ./k8s/api && kubectl apply -f k8s.yaml

# Deploy DB Kubernetes manifests
deploy-db:
	@cd ./k8s/db && kubectl apply -f pv.yaml
	@cd ./k8s/db && kubectl apply -f k8s.yaml

deploy-all: deploy-api deploy-db