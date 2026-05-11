# 04. Network, DNS, and SSL

## Networking Dasar

Cek IP dan route:

```bash
ip a
ip route
```

Cek konektivitas:

```bash
ping -c 4 google.com
curl ifconfig.me
```

Cek socket yang aktif:

```bash
ss -tulpn
```

## DNS

Record umum:

- `A` → domain ke IP VPS
- `CNAME` → alias domain
- `MX` → email
- `TXT` → verifikasi dan policy

Validasi:

```bash
dig example.com
nslookup example.com
```

## SSL / TLS

Install Certbot:

```bash
apt install certbot python3-certbot-nginx -y
```

Generate cert:

```bash
certbot --nginx -d example.com -d www.example.com
```

Test renew:

```bash
certbot renew --dry-run
```

## Best Practice

- Frontend dan backend pakai subdomain terpisah.
- Database tidak diekspos publik.
- Gunakan HTTPS di semua domain yang publik.