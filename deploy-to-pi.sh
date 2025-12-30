#!/bin/bash

# Deploy script for Raspberry Pi
# Usage: ./deploy-to-pi.sh [docker-hub-username]

DOCKER_USERNAME=${1:-"pavlos888"}
IMAGE_NAME="timegnosis-next-app"
TAG="latest"

echo "🏗️  Building multi-platform image..."
docker buildx build \
  --platform linux/arm64 \
  --tag ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG} \
  --push \
  .

echo "✅ Image pushed to Docker Hub"
echo ""
echo "📦 On your Raspberry Pi, run:"
echo "   docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"
echo "   docker stop ${IMAGE_NAME} 2>/dev/null; docker rm ${IMAGE_NAME} 2>/dev/null"
echo "   docker run -d --name ${IMAGE_NAME} --network app-network ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"
