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


---

## 🌐 Memahami DNS & SSL

### Bagaimana DNS Bekerja?

Ketika Anda mengetik `example.com` di browser, prosesnya adalah:

[VIS:DNS_FLOW]

1. Browser bertanya ke **DNS Resolver** (biasanya dari ISP atau Google 8.8.8.8)
2. Resolver mencari di **Root DNS** → **TLD DNS (.com)** → **Authoritative DNS**
3. Authoritative DNS mengembalikan **IP Address** server Anda
4. Browser terhubung ke IP tersebut

**Kenapa ini penting?** Jika DNS salah konfigurasi, traffic bisa diarahkan ke server lain (DNS Hijacking).

### SSL/TLS — Enkripsi Wajib di 2025+

SSL bukan lagi opsional. Google Chrome menandai situs HTTP sebagai "Not Secure". Certbot (Let's Encrypt) menyediakan sertifikat SSL **gratis** dan auto-renewal.

| HTTP | HTTPS |
|---|---|
| Data dikirim plain text | Data dienkripsi |
| Rentan disadap | Aman dari eavesdropping |
| Google ranking rendah | SEO lebih baik |
