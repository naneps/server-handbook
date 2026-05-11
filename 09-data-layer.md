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