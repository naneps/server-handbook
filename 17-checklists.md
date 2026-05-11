# 17. Production Checklists

## Sebelum Go-Live

- [ ] Update sistem
- [ ] User non-root dibuat
- [ ] SSH key aktif
- [ ] Root login dimatikan
- [ ] Firewall aktif
- [ ] Fail2ban aktif
- [ ] SSL aktif
- [ ] Backup aktif
- [ ] Monitoring aktif
- [ ] Log aktif
- [ ] Service auto-start aktif
- [ ] Database aman
- [ ] DNS benar
- [ ] Health check tersedia

## Checklist Harian

- [ ] Cek uptime
- [ ] Cek disk
- [ ] Cek memory
- [ ] Cek service
- [ ] Cek error log
- [ ] Cek backup

## Checklist Mingguan

- [ ] Update security patch
- [ ] Review log
- [ ] Test restore backup
- [ ] Audit akses
- [ ] Bersihkan file tidak perlu

## Checklist Bulanan

- [ ] Review performa
- [ ] Review dependency
- [ ] Rotasi credential jika perlu
- [ ] Audit firewall
- [ ] Review recovery plan