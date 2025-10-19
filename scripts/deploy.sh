#!/bin/bash

# Deployment script for vreshch.com
# Usage: ./deploy.sh [image-tag]

set -e

# Configuration
IMAGE_TAG="${1:-latest}"
IMAGE="ghcr.io/vreshch/vreshch.com:${IMAGE_TAG}"
STACK_NAME="vreshch"
COMPOSE_FILE="/opt/vreshch-com/docker-compose.yml"
VERSION_FILE="/opt/vreshch-com/.deployed-version"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Start deployment
log "🚀 Starting deployment of vreshch.com..."
log "📦 Image: $IMAGE"

# Check if docker-compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    log_error "docker-compose.yml not found at $COMPOSE_FILE"
    exit 1
fi

# Update image tag in docker-compose.yml
log "🔧 Updating image tag in docker-compose.yml..."
sed -i "s|image:.*|image: ${IMAGE}|g" "$COMPOSE_FILE"

# Deploy to Docker Swarm
log "🐳 Deploying stack to Docker Swarm..."
if docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME" --with-registry-auth; then
    log_success "Stack deployed successfully!"
else
    log_error "Stack deployment failed!"
    exit 1
fi

# Wait for service to start
log "⏳ Waiting for service to be ready..."
sleep 15

# Check service status
log "🔍 Checking service status..."
SERVICE_NAME="${STACK_NAME}_web"

# Get service status
SERVICE_STATUS=$(docker service ps "$SERVICE_NAME" --format "table {{.Name}}\t{{.CurrentState}}\t{{.Error}}" --no-trunc)
echo "$SERVICE_STATUS"

# Check if service is running
RUNNING_COUNT=$(docker service ps "$SERVICE_NAME" --filter "desired-state=running" -q | wc -l)

if [ "$RUNNING_COUNT" -gt 0 ]; then
    log_success "Service is running!"
    
    # Save deployed version
    echo "$IMAGE_TAG" > "$VERSION_FILE"
    log_success "Deployed version saved: $IMAGE_TAG"
    
    # Show service details
    log "📊 Service details:"
    docker service inspect "$SERVICE_NAME" --format '{{.Spec.Name}}: {{.Spec.TaskTemplate.ContainerSpec.Image}}'
    
    log_success "🎉 Deployment completed successfully!"
    echo ""
    echo "🌐 Website: https://vreshch.com"
    echo "📋 Service: $SERVICE_NAME"
    echo "🏷️  Version: $IMAGE_TAG"
    
    exit 0
else
    log_error "Service failed to start!"
    
    # Show service logs
    log "📋 Recent service logs:"
    docker service logs "$SERVICE_NAME" --tail 20
    
    exit 1
fi
