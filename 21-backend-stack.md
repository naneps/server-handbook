# 21. Backend Stack

Guide ini untuk backend umum yang berjalan di VPS.

## Stack yang Dibahas

- Node.js / Express / NestJS
- Python / Django
- Go
- Java / Spring Boot
- .NET

## Pola Umum

- backend bind ke localhost
- Nginx jadi reverse proxy
- service dijalankan dengan systemd, PM2, atau Docker
- database tidak dibuka ke publik

## Node.js

```bash
npm install
npm run build
npm run start
```

Jika pakai PM2:

```bash
npm install -g pm2
pm2 start dist/main.js --name backend
pm2 save
pm2 startup
```

## Python / Django

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Gunakan Gunicorn + Nginx untuk production.

## Go

```bash
go build -o app
```

Jalankan binary sebagai service systemd.

## Nginx Reverse Proxy

```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Checklist Backend

- port service benar
- env file lengkap
- migration jalan
- log tidak error
- health endpoint tersedia
- restart policy aktif
