# 06. Frontend Deployment

Bagian ini untuk deployment frontend, baik static maupun SSR.

## Stack Umum

- HTML/CSS/JS
- React
- Vue
- Svelte
- Angular
- Next.js
- Nuxt
- Astro
- Vite

## Static Frontend

### Build

```bash
npm install
npm run build
```

Output umum:

- `dist/`
- `build/`

### Deploy

```bash
rsync -av dist/ /var/www/frontend/dist/
```

### Nginx

```nginx
root /var/www/frontend/dist;
location / {
    try_files $uri $uri/ /index.html;
}
```

## React SPA / Vite SPA

- Build di CI atau lokal
- Upload hasil build
- Serve dari Nginx
- Pakai cache header untuk asset statis

## Next.js / Nuxt

### SSR

```bash
npm install
npm run build
npm run start
```

Proxy ke localhost, misalnya port 3000.

### Static Export

Jika aplikasi mendukung, export ke static lalu serve via Nginx.

## Deployment Flow yang Rapi

1. pull repo
2. install dependency
3. build
4. copy artifact
5. reload Nginx

## Versi Spesifik

Kalau kamu butuh guide frontend yang lebih fokus ke production, buka [20. Frontend Stack](./20-frontend-stack.md).
