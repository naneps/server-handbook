# 25. FastAPI Stack

Guide ini untuk deployment FastAPI di VPS.

## Komponen Umum

- Python 3
- virtual environment
- Gunicorn
- Uvicorn worker
- Nginx
- PostgreSQL / MySQL

## Setup

```bash
apt install python3 python3-venv python3-pip -y
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run Production

```bash
gunicorn -k uvicorn.workers.UvicornWorker main:app -b 127.0.0.1:8000
```

## systemd Service

Gunakan service agar auto-start saat reboot dan restart jika crash.

## Nginx

```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Tips Production

- jangan expose port app langsung ke publik
- pakai env file untuk config
- simpan log error
- aktifkan migrations bila pakai Alembic
- siapkan health check endpoint

## Checklist

- venv aktif
- dependency terinstall
- Gunicorn jalan
- Nginx proxy benar
- SSL aktif
