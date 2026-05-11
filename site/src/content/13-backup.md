# 13. Backup and Recovery

## Prinsip Backup

- backup file + database
- simpan di lokasi berbeda
- otomatis
- diuji restore
- versioned backups

## Backup File App

```bash
tar -czf backup-app-$(date +%F).tar.gz /var/www/app
```

## Backup MySQL / MariaDB

```bash
mysqldump -u root -p appdb | gzip > backup-db-$(date +%F).sql.gz
```

## Backup PostgreSQL

```bash
pg_dump -U appuser appdb | gzip > backup-db-$(date +%F).sql.gz
```

## Sync ke Server Lain

```bash
rsync -avz /backup/ user@backup-server:/data/backup/
```

## Restore

```bash
tar -xzf backup-app-2026-05-11.tar.gz -C /
```

```bash
gunzip < backup-db-2026-05-11.sql.gz | mysql -u root -p appdb
```

```bash
gunzip < backup-db-2026-05-11.sql.gz | psql -U appuser appdb
```


---

## 💾 Backup: Asuransi Data Anda

**"Backup bukan tentang IF server crash, tapi WHEN."**

Tanpa backup, satu kesalahan perintah `rm -rf` bisa menghancurkan data yang dibangun bertahun-tahun.

### Strategi 3-2-1 Backup

[VIS:BACKUP_321]

- **3** salinan data
- **2** media berbeda (disk + cloud)
- **1** offsite (di lokasi berbeda)

### Apa yang Harus Di-backup?

| Data | Frekuensi | Tool |
|---|---|---|
| Database dump | Setiap hari | pg_dump / mysqldump |
| Uploaded files | Setiap hari | rsync / rclone |
| Config files | Setiap perubahan | Git / tar |
| SSL certificates | Auto (certbot) | Certbot auto-renew |

### Automated Backup ke Cloud

```bash
# Script backup harian ke S3/Cloudflare R2
pg_dump dbname | gzip | rclone rcat remote:bucket/db-$(date +%Y%m%d).sql.gz
```

> ⚠️ **Yang paling sering dilupakan**: Test restore! Backup yang tidak pernah dicoba restore = tidak ada backup. Lakukan drill restore minimal 1 bulan sekali.
