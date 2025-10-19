# GitHub Setup Guide

Simple guide to configure GitHub Actions for automated deployment.

## Required GitHub Secrets

Go to: **Settings → Secrets and variables → Actions → New repository secret**

### 1. SSH_PRIVATE_KEY

Your SSH private key for server access.

**How to get it:**
```bash
cat ~/.ssh/id_ed25519
# or
cat ~/.ssh/id_rsa
```

**Add to GitHub:**
- Name: `SSH_PRIVATE_KEY`
- Value: Copy entire key including `-----BEGIN` and `-----END` lines

### 2. SERVER_HOST

Your server hostname or IP address.

**Add to GitHub:**
- Name: `SERVER_HOST`
- Value: `vreshch.com` (or your server IP)

---

## That's It!

Once both secrets are added:

1. **Create a PR** → Auto-validation runs
2. **Merge to master** → Auto-deploys to production
3. **Visit** → https://vreshch.com

---

## Verify Setup

Check your secrets are configured:
- Go to: **Settings → Secrets and variables → Actions**
- You should see:
  - ✅ `SSH_PRIVATE_KEY`
  - ✅ `SERVER_HOST`

---

## Troubleshooting

**Deployment fails with SSH error:**
- Verify `SSH_PRIVATE_KEY` is the complete private key
- Test locally: `ssh -i ~/.ssh/id_ed25519 root@vreshch.com`

**Can't connect to server:**
- Verify `SERVER_HOST` is correct
- Check firewall allows SSH (port 22)

---

**That's all you need!** 🚀
