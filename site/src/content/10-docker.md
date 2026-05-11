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

## Versi Spesifik

Kalau kamu mau panduan Docker production yang lebih lengkap, buka [22. Docker Stack](./22-docker-stack.md).



---

## 🐳 Docker: Mengapa Ini Revolusioner?

Masalah klasik sebelum Docker: *"Di laptop saya jalan, tapi di server error!"*

Docker memecahkan ini dengan **containerization** — mengemas aplikasi beserta semua dependensinya dalam satu unit yang bisa berjalan di mana saja.

[VIS:DOCKER_ARCH]

### Container vs Virtual Machine

| | Container | Virtual Machine |
|---|---|---|
| Ukuran | MB | GB |
| Start time | Detik | Menit |
| Overhead | Sangat rendah | Tinggi |
| Isolasi | Process-level | OS-level |

### Docker Compose untuk Stack Production

Docker Compose memungkinkan Anda mendefinisikan **seluruh stack** (app + db + redis + worker) dalam satu file YAML.

**Keuntungan:**
- Satu perintah `docker compose up -d` = semua layanan jalan
- Environment yang konsisten antara dev dan production
- Easy rollback: ganti image version, deploy ulang

> ⚠️ **Best Practice**: Jangan simpan password/secret langsung di `docker-compose.yml`. Gunakan file `.env` yang tidak di-commit ke git!
