# 22. Docker Stack

Guide ini untuk deployment berbasis Docker dan Docker Compose.

## Cocok untuk

- backend modern
- full stack kecil-menengah
- environment yang butuh reproduksibilitas tinggi
- service yang mudah dipindah antar server

## Install Docker

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
```

## Cek Versi

```bash
docker --version
docker compose version
```

## Contoh Compose

```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    restart: unless-stopped
```

## Pola Production

Biasanya container dipisah menjadi:
- frontend
- backend
- database
- redis
- worker
- reverse proxy

## Best Practice

- pakai volume untuk data persisten
- jangan taruh secret di image
- gunakan `.env`
- buat network internal
- aktifkan restart policy
- cek healthcheck

## Operasional

```bash
docker compose up -d
docker compose logs -f
docker compose ps
docker compose down
```

## Rollback

Simpan versi image atau tag yang jelas agar bisa rollback cepat.
