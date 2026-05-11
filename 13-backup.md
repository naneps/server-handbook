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