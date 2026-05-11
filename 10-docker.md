# 10. Docker and Docker Compose

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

## Tambahkan User ke Docker Group

```bash
usermod -aG docker deploy
```

## Contoh Docker Compose

```yaml
services:
  app:
    image: nginx:alpine
    ports:
      - "8080:80"
```

Jalankan:

```bash
docker compose up -d
```

## Stack Production

Contoh layanan umum:
- frontend
- backend
- db
- redis
- worker

Gunakan volume untuk data persisten dan restart policy yang aman.

## Best Practice

- Jangan simpan secret di image.
- Gunakan env file.
- Simpan data database di volume.
- Pisahkan network internal jika perlu.