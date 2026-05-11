# 11. CI/CD and Automation

## Tujuan

- deploy otomatis
- minim human error
- testing sebelum release
- rollback lebih mudah

## Tools Umum

- GitHub Actions
- GitLab CI
- Jenkins
- Drone
- CircleCI

## Workflow Umum

1. push ke repo
2. test
3. build artifact
4. deploy ke VPS
5. restart service
6. health check

## Praktik Deploy

- build di CI
- transfer artifact ke server
- restart service
- cek endpoint `/health`

## Hal yang Perlu Diotomasi

- build frontend
- build backend
- migrasi database
- restart service
- backup sebelum release


---

## 🔄 CI/CD: Deploy Otomatis Tanpa Manual

CI/CD (Continuous Integration / Continuous Deployment) mengotomatiskan proses dari **push code** sampai **live di server**.

[VIS:CICD_FLOW]

### Tanpa CI/CD vs Dengan CI/CD

**Tanpa CI/CD (Manual):**
1. Developer push code ke GitHub
2. SSH ke server
3. git pull
4. npm install / composer install
5. Jalankan migration
6. Restart service
7. Cek apakah berhasil
8. (Kalau gagal, rollback manual...)

**Dengan CI/CD (Otomatis):**
1. Developer push code → **Selesai!** Sisanya otomatis.

### GitHub Actions — Pipeline Sederhana

```yaml
on: push (branch: main)
  → Test otomatis
  → Build image
  → Deploy ke server
  → Notifikasi Slack/Discord
```

> 💡 Dengan CI/CD yang baik, Anda bisa deploy berkali-kali dalam sehari dengan aman karena setiap deploy sudah melalui automated testing.
