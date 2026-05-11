# 14. Maintenance Routine

## Harian

- cek uptime
- cek error log
- cek disk usage
- cek service penting
- cek proses aneh

## Mingguan

- update security patch
- review log
- bersihkan file lama
- test backup
- audit akses

## Bulanan

- test restore backup
- review dependency
- audit firewall
- review resource usage
- rotasi credential bila perlu

## Command Penting

```bash
df -h
free -h
uptime
journalctl -xe
systemctl status nginx
```

## Bersihkan Log

```bash
journalctl --vacuum-time=7d
apt autoremove -y
apt clean
```