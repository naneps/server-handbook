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