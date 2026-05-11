# 08. Full Stack Deployment

## Arsitektur Umum

Contoh arsitektur yang rapi:

```text
User
  ↓
Nginx
  ├── example.com      → Frontend
  └── api.example.com  → Backend
       ↓
    Database / Redis / Queue
```

## Best Practice

- Frontend dan backend dipisah.
- Backend hanya bind ke localhost atau private network.
- Database tidak terbuka ke publik.
- Pakai environment variable untuk config.
- Gunakan migration terkontrol.
- Backup sebelum deploy besar.

## Pola Domain

- `example.com` → landing page
- `app.example.com` → dashboard
- `api.example.com` → API
- `admin.example.com` → panel admin

## Deploy Workflow

1. build frontend
2. build backend
3. migrasi database
4. deploy artifact
5. reload service
6. cek health endpoint