# Makefile

# constants
API_URL=http://api.example.com

# Define Docker image names
CLIENT_IMAGE_NAME=client
API_IMAGE_NAME=api
DB_IMAGE_NAME=db

# Define build and deploy targets
.PHONY: build_client build_api build_db build_all deploy_client deploy_api deploy_db deploy_all

# Default goal
build: build_all
deploy: deploy_all

# Build the CLIENT Docker image
build_client:
	@cd ./client && docker build --build-arg VITE_API_URL=${API_URL} -t $(CLIENT_IMAGE_NAME) .

# Build the API Docker image
build_api:
	@cd ./api && docker build -t $(API_IMAGE_NAME) .

# Build the DB Docker image
build_db:
	@cd ./db && docker build -t $(DB_IMAGE_NAME) .

# Build all images in parallel
build_all: build_client build_api build_db

# Deploy CLIENT Kubernetes manifests
deploy_client:
	@cd ./k8s/client && kubectl apply -f k8s.yaml

# Deploy API Kubernetes manifests
deploy_api:
	@cd ./k8s/api && kubectl apply -f k8s.yaml

# Deploy DB Kubernetes manifests
deploy_db:
	@cd ./k8s/db && kubectl apply -f pv.yaml
	@cd ./k8s/db && kubectl apply -f k8s.yaml

deploy_all: deploy_client deploy_api deploy_db