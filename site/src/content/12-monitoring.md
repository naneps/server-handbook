# 12. Monitoring and Logging

## Tool Dasar

- htop
- iotop
- nload
- ss
- lsof
- journalctl

Install:

```bash
apt install -y htop iotop nload net-tools lsof
```

## Monitoring yang Harus Diperhatikan

- CPU
- RAM
- disk
- network
- uptime
- response time
- error rate
- DB connection
- queue length

## Log Systemd

```bash
journalctl -u nginx -n 100 --no-pager
journalctl -u app -f
journalctl --since today
```

## Advanced Monitoring

- Prometheus
- Grafana
- Node Exporter
- Loki
- Promtail
- Uptime Kuma
- Netdata

## Prinsip Logging

- log akses
- log error
- log deploy
- log audit
- log database bila perlu


---

## 📊 Monitoring: Mengetahui Sebelum Server Crash

Monitoring adalah "sistem alarm" server Anda. Tanpa monitoring, Anda baru tahu server bermasalah setelah **user komplain**.

[VIS:MONITORING_STACK]

### Apa yang Harus Dipantau?

**Infra Level:**
| Metric | Threshold Bahaya | Dampak |
|---|---|---|
| CPU Usage | > 80% sustained | App melambat, hang |
| RAM Usage | > 90% | OOM Killer aktif, process mati |
| Disk Usage | > 85% | Write fail, app error |
| Disk I/O | Tinggi sustained | Database lambat |

**App Level:**
- Response time > 2 detik = user mulai tidak sabar
- Error rate > 1% = ada masalah serius
- Queue length naik terus = worker tidak cukup

### Stack Monitoring Modern

```
Metrics: Node Exporter → Prometheus → Grafana (Dashboard)
Logs:    Promtail → Loki → Grafana (Log Viewer)
Uptime:  Uptime Kuma → Alert ke Telegram/Slack
```

> 💡 **Uptime Kuma** adalah pilihan terbaik untuk monitoring sederhana — gratis, self-hosted, dan bisa notifikasi ke Telegram!
