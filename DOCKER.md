# Docker Setup

Single `docker-compose.yml` for both development and production.

## Production (Raspberry Pi)

### Recommended: Pre-build on Mac, Deploy to Pi

Building on Pi is slow (20-30 min). Better to build on your Mac and push to Docker Hub:

**1. On your Mac:**
```bash
# Set your Docker Hub username
export DOCKER_USERNAME=your-dockerhub-username

# Login to Docker Hub
docker login

# Build and push
./deploy-to-pi.sh
```

**Tip:** Add `export DOCKER_USERNAME=your-username` to your `~/.zshrc` or `~/.bashrc` to make it permanent.

**2. On your Pi:**
- Edit `docker-compose.yml`: uncomment the `image:` line, comment out the `build:` section
- Then run:
```bash
docker compose pull
docker compose up -d
```


## Local Development (Quick Test)

For local testing without hot reload:

```bash
docker compose up --build
```

## Local Development (With Hot Reload)

1. Uncomment the `volumes` section in `docker-compose.yml`
2. Run with environment variables:

```bash
BUILD_TARGET=builder NODE_ENV=development docker compose up --build
```

This mounts your source code for live changes.

## Stopping

```bash
docker compose down
```

## Rebuild from Scratch

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```