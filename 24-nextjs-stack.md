# 24. Next.js Stack

Guide ini untuk deployment Next.js di VPS.

## Mode Deployment

- SSR / server mode
- static export
- standalone output

## Flow Umum

```bash
npm install
npm run build
npm run start
```

Jika ingin dijalankan sebagai service, gunakan PM2 atau systemd.

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Kalau Static Export

Jika app cocok untuk static export, serve hasil build via Nginx seperti static site biasa.

## Hal yang Perlu Dicek

- image optimization
- environment variable
- route khusus SSR
- cache control
- build error di server vs lokal

## Checklist

- build sukses
- app jalan di localhost
- Nginx proxy benar
- SSL aktif
- domain/subdomain benar
