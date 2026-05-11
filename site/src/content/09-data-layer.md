# 09. Database, Cache, Queue, and Storage

## PostgreSQL

```bash
apt install postgresql postgresql-contrib -y
sudo -u postgres psql
```

```sql
CREATE USER appuser WITH PASSWORD 'passwordkuat';
CREATE DATABASE appdb OWNER appuser;
```

## MySQL / MariaDB

```bash
apt install mariadb-server -y
mysql_secure_installation
```

```sql
CREATE DATABASE appdb;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'passwordkuat';
GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

## Redis

Redis dipakai untuk:
- cache
- session
- queue
- rate limit

```bash
apt install redis-server -y
redis-cli ping
```

## Queue / Worker

Contoh tooling:
- Celery
- BullMQ
- Sidekiq
- Laravel Queue

## Storage

Untuk file upload skala serius, gunakan object storage seperti:
- S3
- MinIO
- Cloudflare R2
- Backblaze B2


---

## 💾 Data Layer: Database, Cache, Queue, Storage

Ini adalah "otak penyimpanan" aplikasi Anda. Kesalahan di layer ini bisa mengakibatkan **data loss** yang tidak bisa dipulihkan.

[VIS:DATA_ARCH]

### Database — Jantung Aplikasi

**PostgreSQL vs MySQL:**
| | PostgreSQL | MySQL |
|---|---|---|
| Tipe data | Lebih lengkap (JSON, Array) | Standar |
| Performance | Unggul untuk complex queries | Unggul untuk simple reads |
| Rekomendasi | Laravel, Django, FastAPI | WordPress, CMS legacy |

> ⚠️ **JANGAN** expose port database (3306/5432) ke publik. Akses hanya dari localhost atau internal network.

### Redis — Cache & Queue

Redis menyimpan data di **memory (RAM)**, bukan disk. Ini membuatnya sangat cepat (microseconds) untuk:
- **Caching**: Simpan hasil query database yang sering diakses
- **Session**: Simpan session user tanpa hit database
- **Queue**: Antrian job background (kirim email, proses gambar)

### Queue Worker — Background Processing

Jangan biarkan user menunggu proses yang lama (kirim email, resize gambar). Masukkan ke antrian, proses di background!

```
User Request → API → Push Job ke Queue → Response ke User (cepat!)
                              ↓
                       Queue Worker proses job di background
```
