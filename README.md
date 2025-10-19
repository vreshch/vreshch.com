# Personal CV Website: [vreshch.com](http://vreshch.com)

[![Deployment](https://github.com/vreshch/vreshch.com/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/vreshch/vreshch.com/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Personal Website vreshch.com, contains CV, interests, Contacts;

## Technologies Used

* Rect & Typescript
* Next JS as Framework

## 🚀 Deployment
- **Automated CI/CD:** Deploys automatically on merge to `master`
- **Infrastructure Details:** https://github.com/vreshch/infrastructure

### Quick Start
1. **Create PR** → Auto-validation runs
2. **Merge to master** → Auto-deploys to production
3. **Visit** → https://vreshch.com

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
