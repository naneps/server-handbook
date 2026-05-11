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