# 20. Frontend Stack

Guide ini untuk frontend yang disajikan lewat VPS, terutama:
- static site
- SPA
- React
- Vue
- Svelte
- Astro
- Vite

## Kapan Dipakai

- landing page
- dashboard frontend
- documentation site
- marketing site
- single-page app

## Flow Deployment

1. install dependency
2. build project
3. upload artifact ke server
4. serve via Nginx
5. aktifkan SSL

## Build Umum

```bash
npm install
npm run build
```

Output biasanya:
- `dist/`
- `build/`

## Nginx untuk SPA

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

## Cache Header untuk Asset

Untuk file statis seperti CSS/JS/image, aktifkan cache agar loading lebih cepat.

## Deployment Checklist

- build sukses
- path asset benar
- routing SPA aman
- 404 fallback valid
- SSL aktif
- domain mengarah ke IP VPS

## Catatan Praktis

Kalau frontend kamu pakai SSR, lihat [24. Next.js Stack](./24-nextjs-stack.md).
