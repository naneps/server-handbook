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