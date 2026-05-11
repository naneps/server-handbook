# 03. Security Hardening

Bagian ini fokus pada pengamanan dasar server.

## Firewall UFW

```bash
apt install ufw -y
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
ufw status verbose
```

## Fail2ban

```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

Cek status:

```bash
fail2ban-client status
```

## SSH Hardening

Edit `/etc/ssh/sshd_config`:

```text
PermitRootLogin no
PasswordAuthentication no
MaxAuthTries 3
LoginGraceTime 30
AllowUsers deploy
```

## Automatic Security Updates

```bash
apt install unattended-upgrades -y
dpkg-reconfigure unattended-upgrades
```

## Service Audit

```bash
systemctl list-units --type=service --state=running
```

Matikan service yang tidak perlu:

```bash
systemctl disable nama-service
systemctl stop nama-service
```

## Permission Hygiene

```bash
chown -R deploy:deploy /var/www/app
chmod -R 755 /var/www/app
```

## Log Login

```bash
journalctl -u ssh -n 100 --no-pager
grep sshd /var/log/auth.log
```

## Checklist Keamanan

- key-based SSH
- root login off
- firewall aktif
- update rutin
- log monitoring
- backup tersedia


---

## 🛡️ Memahami Security Hardening

Security hardening adalah proses **memperkecil attack surface** server. Bayangkan server Anda adalah benteng — semakin sedikit pintu dan jendela, semakin mudah dijaga.

[SIM:FIREWALL]

### Mengapa UFW?

UFW (Uncomplicated Firewall) adalah frontend dari iptables. Tanpa UFW, Anda harus menulis aturan iptables yang kompleks. UFW menyederhanakan itu.

**Port yang umumnya dibuka:**
| Port | Layanan | Keterangan |
|---|---|---|
| 22 | SSH | Akses remote. Pertimbangkan ganti ke port non-standar |
| 80 | HTTP | Web traffic biasa |
| 443 | HTTPS | Web traffic terenkripsi |
| 3306 | MySQL | **JANGAN buka ini ke publik!** |

### SSH Hardening — Mengapa Ini Krusial?

[SIM:SSH]

**PermitRootLogin no** — Mencegah attacker langsung menyerang akun root.  
**PasswordAuthentication no** — Mencegah brute force attack.  
**MaxAuthTries 3** — Membatasi percobaan login gagal.

> ⚠️ **PERINGATAN**: Pastikan SSH key sudah terpasang sebelum menonaktifkan PasswordAuthentication. Kalau tidak, Anda akan terkunci dari server sendiri!
