---
layout: default
title: VPS Operations Handbook
description: Comprehensive handbook for VPS operations - from basic setup to advanced production patterns including security, deployment, Docker, monitoring, and maintenance for Ubuntu/Debian servers.
---

# 📚 VPS Operations Handbook

**Panduan operasional VPS dari basic sampai advanced**, disusun seperti handbook untuk referensi harian dalam mengelola server production.

---

## 🚀 Quick Start - Pilih Path Sesuai Kebutuhanmu

| 👤 Pemula | 🌐 Frontend Dev | 🔧 Backend Dev | 🐳 Docker | 🏭 Production |
|---|---|---|---|---|
| Baru setup server? | Mau deploy app? | Setup API? | Prefer container? | Multi-server setup? |
| Mulai: [01](./01-foundation.md) → [02](./02-initial-setup.md) → [03](./03-security-hardening.md) | Mulai: [05](./05-nginx.md) → [06](./06-frontend.md) | Mulai: [07](./07-backend.md) → [09](./09-data-layer.md) | Mulai: [10](./10-docker.md) → [08](./08-fullstack.md) | Mulai: [17](./17-checklists.md) → [15](./15-advanced.md) |

---

## 📖 Peta Lengkap - 26 Chapters Handbook

### **Foundation (Setup Awal)**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 01 | [Foundation](./01-foundation.md) | Konsep dasar VPS & Linux |
| 02 | [Initial Setup](./02-initial-setup.md) | First time server setup |
| 03 | [Security Hardening](./03-security-hardening.md) | Keamanan server |
| 04 | [Network, DNS, and SSL](./04-network-dns-ssl.md) | Networking & certificates |

### **Deployment (Deploy Aplikasi)**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 05 | [Nginx and Reverse Proxy](./05-nginx.md) | Web server setup |
| 06 | [Frontend Deployment](./06-frontend.md) | Deploy frontend apps |
| 07 | [Backend Deployment](./07-backend.md) | Deploy backend/API |
| 08 | [Full Stack Deployment](./08-fullstack.md) | Full stack setup |

### **Infrastructure (Data & Container)**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 09 | [Database, Cache, Queue, Storage](./09-data-layer.md) | Database setup & management |
| 10 | [Docker and Docker Compose](./10-docker.md) | Containerization |
| 11 | [CI/CD and Automation](./11-cicd.md) | Automated deployment |

### **Operations (Operasional Harian)**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 12 | [Monitoring and Logging](./12-monitoring.md) | Monitoring & observability |
| 13 | [Backup and Recovery](./13-backup.md) | Backup strategies |
| 14 | [Maintenance Routine](./14-maintenance.md) | Maintenance tasks |
| 15 | [Advanced Production Patterns](./15-advanced.md) | Advanced setup |

### **Reference & Troubleshooting**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 16 | [Troubleshooting](./16-troubleshooting.md) | Problem solving |
| 17 | [Production Checklists](./17-checklists.md) | Pre-deployment checklist |
| 18 | [Command Cheat Sheet](./18-cheatsheet.md) | Quick command reference |

### **Stack-Specific Guides (Framework Tertentu)**
| # | Chapter | Deskripsi |
|---|---------|-----------|
| 19 | [Specific Stack Guides](./19-specific-stacks.md) | Stack overview |
| 20 | [Frontend Stack](./20-frontend-stack.md) | React, Vue, Next.js, dll |
| 21 | [Backend Stack](./21-backend-stack.md) | Node.js, Python, Laravel, dll |
| 22 | [Docker Stack](./22-docker-stack.md) | Docker best practices |
| 23 | [Laravel Stack](./23-laravel-stack.md) | Laravel-specific setup |
| 24 | [Next.js Stack](./24-nextjs-stack.md) | Next.js deployment |
| 25 | [FastAPI Stack](./25-fastapi-stack.md) | FastAPI deployment |
| 26 | [Architecture Diagram](./26-architecture.mmd) | Visual architecture |

---

## 🏗️ Arsitektur Referensi

```
┌─────────────────────────────────────────────┐
│           User / Browser                    │
└──────────────────┬──────────────────────────┘
                   │
              DNS Resolution
                   │
┌──────────────────▼─────────────────────────┐
│    Nginx / Reverse Proxy (Port 80/443)     │
├──────────────────┬────────────────────────┤
│                  │                         │
│    Frontend App  │  Backend API            │
│    (React/Vue)   │  ├─ Queue Workers      │
│                  │  ├─ Redis Cache        │
│                  │  ├─ PostgreSQL/MySQL   │
│                  │  └─ Object Storage     │
└──────────────────┬────────────────────────┘
                   │
        CI/CD Pipeline (Auto Deploy)
                   │
        GitHub → Actions → Server
```

**Full diagram:** [26-architecture.mmd](./26-architecture.mmd)

---

## 📚 Cara Pakai Handbook

### **Path 1: Baca Berurutan (Pemula)**
1. Baca dari chapter 01 sampai tuntas
2. Pahami dasar sebelum lompat ke advanced
3. Terbaik untuk learning dari nol

### **Path 2: Jump to Specific Stack (Experienced)**
1. Lompat langsung ke stack guide mu
2. Misalnya: ingin Next.js? Langsung ke [24-nextjs-stack.md](./24-nextjs-stack.md)
3. Cocok untuk developer berpengalaman

### **Path 3: Reference Mode (Production)**
1. Gunakan sebagai reference/checklist
2. Buka [17-checklists.md](./17-checklists.md) sebelum production
3. Gunakan [18-cheatsheet.md](./18-cheatsheet.md) untuk quick reference

### **Path 4: Problem Solving**
1. Ada masalah? Cek [16-troubleshooting.md](./16-troubleshooting.md)
2. Atau search chapter tertentu
3. Gunakan [18-cheatsheet.md](./18-cheatsheet.md) untuk commands

---

## 🎯 Key Takeaways

✅ **Comprehensive** - Foundation sampai production patterns  
✅ **Practical** - Real-world scenarios & best practices  
✅ **Multi-Stack** - Laravel, Next.js, FastAPI, Node.js, Django, dll  
✅ **Production-Ready** - Checklists, monitoring, backup strategies  
✅ **Security-Focused** - Hardening, SSL, firewall setup  
✅ **DevOps-Oriented** - Docker, CI/CD, automation included  

---

## 📌 Important Notes

- **OS Assumption**: Ubuntu Server / Debian-based Linux
- **Version**: Handbook ini untuk Ubuntu 20.04+ / Debian 11+
- **Flexibility**: Beberapa path atau nama service bisa berbeda di distro lain
- **Updates**: Handbook ini terus di-update dengan best practices terbaru

---

## 🔗 Related Resources

- **[GitHub Repository](https://github.com/naneps/server-handbook)** - Source code
- **[Issues & Discussions](https://github.com/naneps/server-handbook/issues)** - Report problem
- **[My Profile](https://github.com/naneps)** - Creator profile

---

## 📝 Topics

`vps` • `linux` • `ubuntu` • `debian` • `nginx` • `docker` • `devops` • `deployment` • `backend` • `frontend` • `laravel` • `nextjs` • `fastapi` • `security` • `monitoring` • `backup` • `handbook` • `guide` • `production`

---

**Last Updated**: May 2026  
**Status**: Active & Maintained ✅

**Semoga handbook ini membantu dalam operasional VPS mu!** 🚀
