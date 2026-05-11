# 07. Backend Deployment

Bagian ini mencakup backend umum seperti Node.js, Python, PHP, Go, Java, dan .NET.

## Pola Umum

- App berjalan di localhost
- Nginx berada di depan sebagai reverse proxy
- Service dikelola oleh systemd / PM2 / Docker

## Node.js / Express / NestJS

### Install Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### Jalankan dengan PM2

```bash
npm install -g pm2
pm2 start dist/main.js --name backend
pm2 save
pm2 startup
```

## Python FastAPI

### Setup

```bash
apt install python3 python3-venv python3-pip -y
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Run

```bash
gunicorn -k uvicorn.workers.UvicornWorker main:app -b 127.0.0.1:8000
```

## Django

Umumnya dipasangkan dengan:
- Gunicorn
- Nginx
- PostgreSQL
- Redis
- Celery

## Laravel

### Install PHP

```bash
apt install php php-fpm php-cli php-mysql php-xml php-mbstring php-curl php-zip unzip -y
```

### Deploy Flow

```bash
composer install
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

## Go

```bash
go build -o app
```

Jalankan binary sebagai service systemd.

## Java / .NET

- Build artifact di CI
- Jalankan sebagai service
- Reverse proxy via Nginx

## Versi Spesifik

Untuk backend yang lebih fokus ke pola production, service, dan reverse proxy, buka [21. Backend Stack](./21-backend-stack.md).
