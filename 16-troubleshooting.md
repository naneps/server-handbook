# 16. Troubleshooting

## SSH Tidak Bisa Login

```bash
systemctl status ssh
ss -tulpn | grep ssh
```

## Website Tidak Bisa Dibuka

Cek:
- DNS
- Nginx
- firewall
- backend app

```bash
nginx -t
systemctl status nginx
ufw status
```

## 502 Bad Gateway

Biasanya backend mati atau port salah.

```bash
journalctl -u app -n 100 --no-pager
tail -f /var/log/nginx/error.log
```

## Disk Penuh

```bash
df -h
du -sh /* 2>/dev/null | sort -h
find / -type f -size +500M 2>/dev/null
```

## RAM Habis / OOM

```bash
free -h
dmesg | grep -i oom
top
```

## Permission Denied

```bash
ls -lah
chown -R deploy:deploy /var/www/app
chmod -R 755 /var/www/app
```

## SSL Error

```bash
certbot certificates
nginx -t
```