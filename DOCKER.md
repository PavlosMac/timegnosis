# Docker Deployment

## Deploy to Raspberry Pi

### 1. Build & Push (on your Mac)

```bash
./deploy-to-pi.sh
```

This builds the ARM64 image and pushes to Docker Hub.

### 2. Deploy (on Pi)

```bash
docker pull pavlos888/timegnosis-next-app:latest
docker stop timegnosis-next-app 2>/dev/null; docker rm timegnosis-next-app 2>/dev/null
docker run -d --name timegnosis-next-app --network app-network pavlos888/timegnosis-next-app:latest
```

The app connects to `app-network` where cloudflared routes traffic.

## Local Development

### Without Docker (recommended)

```bash
npm run dev
```

### With Docker

```bash
docker compose up --build
```

## Useful Commands

```bash
# View logs
docker logs timegnosis-next-app

# Stop container
docker stop timegnosis-next-app

# Check running containers
docker ps

# Check networks
docker network ls
```
