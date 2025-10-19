# Personal CV Website: [vreshch.com](http://vreshch.com)

[![GitHub Build Status](https://github.com/vreshch/vreshch.com/workflows/CI/badge.svg)](https://github.com/vreshch/vreshch.com/actions?query=workflow%3ACI)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Personal Website vreshch.com, contains CV, interests, Contacts;

## Technologies Used

* Rect & Typescript
* Next JS as Framework
* Shipped with Docker
* Terraform for Infrastructure

## 🚀 Deployment

**Automated CI/CD:** Deploys automatically on merge to `master`

### Quick Start

1. **Create PR** → Auto-validation runs
2. **Merge to master** → Auto-deploys to production
3. **Visit** → https://vreshch.com

### Manual Deployment

```bash
# SSH to server
ssh root@vreshch.com

# Deploy latest version
cd /opt/vreshch-com && ./deploy.sh latest

# Or deploy specific version
./deploy.sh <commit-sha>
```

### CI/CD Pipelines

**Pull Request Validation** (`.github/workflows/pr-validation.yml`)
- ✅ Lint code
- ✅ Build project  
- ✅ Validate Docker
- ⏱️ ~2-3 minutes

**Production Deployment** (`.github/workflows/deploy.yml`)
- 🐳 Build & push Docker image to GHCR
- 🚀 SSH deploy to server
- ✅ Health verification
- ⏱️ ~5-7 minutes

### Infrastructure

- **Server:** vreshch.com
- **Stack:** Docker Swarm
- **Proxy:** Traefik (auto SSL via Let's Encrypt)
- **Registry:** GitHub Container Registry (ghcr.io)
- **Details:** https://github.com/vreshch/infrastructure

### Setup

See [GitHub Setup Guide](docs/setup-github.md) for required environment variables and secrets.

## Docker Commands

**Local Development:**
```bash
# Build image
docker build -t vreshch-com:local .

# Run locally
docker run -p 8080:8080 vreshch-com:local

# Access at http://localhost:8080
```

**Production Images:**
```bash
# Pull from registry
docker pull ghcr.io/vreshch/vreshch.com:latest

# Run production image
docker run -p 8080:8080 ghcr.io/vreshch/vreshch.com:latest
```

## Contacts

* [Website](http://vreshch.com)
* [LinkedIn](https://www.linkedin.com/in/vreshch/)
* [GitHub](https://github.com/vreshch)
* [Email](vreshch@gmail.com)
