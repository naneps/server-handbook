# 05. Nginx and Reverse Proxy

Nginx dipakai untuk static files, reverse proxy, SSL termination, compression, dan routing domain.

## Install

```bash
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

## Test Config

```bash
nginx -t
```

## Reverse Proxy untuk Backend

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan:

```bash
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Static Site

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Hal Penting

- Simpan backend di localhost.
- Gunakan `try_files` untuk SPA.
- Tambahkan rate limit jika perlu.
- Gunakan logging access dan error.


---

## 🚦 Nginx: Lebih dari Sekadar Web Server

Nginx bisa berperan sebagai:
- **Static File Server** — Menyajikan HTML, CSS, JS, gambar
- **Reverse Proxy** — Meneruskan request ke app backend
- **Load Balancer** — Distribusi traffic ke beberapa server
- **SSL Terminator** — Menangani HTTPS sebelum diteruskan ke app

[SIM:NGINX]

### Cara Kerja Reverse Proxy

Tanpa Nginx, app backend Anda harus langsung menghadapi internet — berisiko. Dengan Nginx:

```
User Browser
     ↓
  Nginx :80/:443  ← SSL Termination di sini
     ↓
  App :8000       ← Backend aman di dalam
```

**Keuntungan utama:**
- App backend tidak perlu menangani SSL
- Nginx jauh lebih efisien dalam menangani koneksi simultan
- Bisa menyajikan static files tanpa menyentuh app sama sekali

> 💡 **try_files $uri $uri/ /index.html** — Ini krusial untuk SPA (React/Vue). Tanpa ini, refresh halaman akan menghasilkan 404.
