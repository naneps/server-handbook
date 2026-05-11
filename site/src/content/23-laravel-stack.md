# 23. Laravel Stack

Guide ini untuk deployment Laravel di VPS.

## Komponen Umum

- PHP-FPM
- Nginx
- Composer
- MySQL atau PostgreSQL
- Redis untuk cache / queue

## Install PHP

```bash
apt install php php-fpm php-cli php-mysql php-xml php-mbstring php-curl php-zip unzip -y
```

## Deploy Flow

```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Permission Penting

```bash
chown -R www-data:www-data /var/www/laravel
chmod -R 775 storage bootstrap/cache
```

## Nginx

Arahkan root ke folder `public`.

```nginx
root /var/www/laravel/public;
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Queue dan Scheduler

- queue worker bisa dijalankan via Supervisor/systemd
- scheduler dijalankan via cron tiap menit

Contoh cron:

```bash
* * * * * php /var/www/laravel/artisan schedule:run >> /dev/null 2>&1
```

## Checklist Laravel

- `.env` terisi benar
- `APP_KEY` ada
- permission storage benar
- queue worker jalan
- migration sukses
- SSL aktif
