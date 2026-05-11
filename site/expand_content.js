import fs from 'fs';
import path from 'path';

const contentDir = './src/content';

const expansions = {
  '01-foundation.md': `

---

## 🧠 Penjelasan Mendalam: Apa itu VPS?

**VPS (Virtual Private Server)** adalah komputer fisik yang kuat yang dibagi menjadi beberapa mesin virtual menggunakan teknologi seperti KVM atau Xen.

**Analogi Apartemen:**
- 🏢 **Dedicated Server** = Memiliki gedung sendiri. Mahal, total kontrol.
- 🛏️ **Shared Hosting** = Asrama. Satu kamar mandi bersama. Kalau tetangga boros resource, kamu kena dampaknya.
- 🏠 **VPS** = Unit apartemen. Punya kunci sendiri, dapur sendiri, batas yang jelas — tapi masih satu gedung.

[VIS:VPS_COMPARISON]

### Mengapa Prinsip Ini Penting?

| Prinsip | Alasan |
|---|---|
| Jangan pakai root | Jika app diretas, attacker hanya dapat akses terbatas |
| SSH Key, bukan password | Password bisa di-brute force, SSH Key hampir mustahil |
| Backup sebelum perubahan | Satu perintah salah bisa merusak seluruh sistem |
| Tutup port tidak perlu | Setiap port terbuka = pintu potensial bagi attacker |
| Pantau log | Deteksi dini serangan atau anomali sistem |

[VIS:DEPLOYMENT_FLOW]
`,

  '02-initial-setup.md': `

---

## 🔧 Mengapa Setiap Langkah Ini Penting?

Setup awal adalah fondasi dari segalanya. Melewatkan satu langkah di sini bisa berakibat server tidak aman atau tidak stabil.

[VIS:SETUP_STEPS]

### Alur Setup yang Benar

**Step 1: Login sebagai root → buat user baru**
Root adalah akun superuser dengan akses tanpa batas. Membuat user non-root adalah langkah keamanan pertama dan paling penting.

**Step 2: Update sistem**
Package yang belum diupdate bisa memiliki celah keamanan (*CVE*) yang sudah diketahui publik. Attacker aktif mencari server yang belum di-patch.

**Step 3: Konfigurasi SSH**
SSH adalah satu-satunya pintu masuk ke server. Mengamankan SSH = mengamankan seluruh server.

**Step 4: Setup Firewall**
Firewall memblokir koneksi ke port yang tidak perlu. Semakin sedikit port terbuka, semakin kecil *attack surface*.

> 💡 **Tip**: Jalankan langkah-langkah ini secara berurutan. Jangan loncat-loncat, karena setiap langkah bergantung pada langkah sebelumnya.
`,

  '03-security-hardening.md': `

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
`,

  '04-network-dns-ssl.md': `

---

## 🌐 Memahami DNS & SSL

### Bagaimana DNS Bekerja?

Ketika Anda mengetik \`example.com\` di browser, prosesnya adalah:

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
`,

  '05-nginx.md': `

---

## 🚦 Nginx: Lebih dari Sekadar Web Server

Nginx bisa berperan sebagai:
- **Static File Server** — Menyajikan HTML, CSS, JS, gambar
- **Reverse Proxy** — Meneruskan request ke app backend
- **Load Balancer** — Distribusi traffic ke beberapa server
- **SSL Terminator** — Menangani HTTPS sebelum diteruskan ke app

[SIM:NGINX]

### Cara Kerja Reverse Proxy

Tanpa Nginx, app backend Anda harus langsung menghadapi internet — berisiko. Dengan Nginx:

\`\`\`
User Browser
     ↓
  Nginx :80/:443  ← SSL Termination di sini
     ↓
  App :8000       ← Backend aman di dalam
\`\`\`

**Keuntungan utama:**
- App backend tidak perlu menangani SSL
- Nginx jauh lebih efisien dalam menangani koneksi simultan
- Bisa menyajikan static files tanpa menyentuh app sama sekali

> 💡 **try_files \$uri \$uri/ /index.html** — Ini krusial untuk SPA (React/Vue). Tanpa ini, refresh halaman akan menghasilkan 404.
`,

  '09-data-layer.md': `

---

## 💾 Data Layer: Database, Cache, Queue, Storage

Ini adalah "otak penyimpanan" aplikasi Anda. Kesalahan di layer ini bisa mengakibatkan **data loss** yang tidak bisa dipulihkan.

[VIS:DATA_ARCH]

### Database — Jantung Aplikasi

**PostgreSQL vs MySQL:**
| | PostgreSQL | MySQL |
|---|---|---|
| Tipe data | Lebih lengkap (JSON, Array) | Standar |
| Performance | Unggul untuk complex queries | Unggul untuk simple reads |
| Rekomendasi | Laravel, Django, FastAPI | WordPress, CMS legacy |

> ⚠️ **JANGAN** expose port database (3306/5432) ke publik. Akses hanya dari localhost atau internal network.

### Redis — Cache & Queue

Redis menyimpan data di **memory (RAM)**, bukan disk. Ini membuatnya sangat cepat (microseconds) untuk:
- **Caching**: Simpan hasil query database yang sering diakses
- **Session**: Simpan session user tanpa hit database
- **Queue**: Antrian job background (kirim email, proses gambar)

### Queue Worker — Background Processing

Jangan biarkan user menunggu proses yang lama (kirim email, resize gambar). Masukkan ke antrian, proses di background!

\`\`\`
User Request → API → Push Job ke Queue → Response ke User (cepat!)
                              ↓
                       Queue Worker proses job di background
\`\`\`
`,

  '10-docker.md': `

---

## 🐳 Docker: Mengapa Ini Revolusioner?

Masalah klasik sebelum Docker: *"Di laptop saya jalan, tapi di server error!"*

Docker memecahkan ini dengan **containerization** — mengemas aplikasi beserta semua dependensinya dalam satu unit yang bisa berjalan di mana saja.

[VIS:DOCKER_ARCH]

### Container vs Virtual Machine

| | Container | Virtual Machine |
|---|---|---|
| Ukuran | MB | GB |
| Start time | Detik | Menit |
| Overhead | Sangat rendah | Tinggi |
| Isolasi | Process-level | OS-level |

### Docker Compose untuk Stack Production

Docker Compose memungkinkan Anda mendefinisikan **seluruh stack** (app + db + redis + worker) dalam satu file YAML.

**Keuntungan:**
- Satu perintah \`docker compose up -d\` = semua layanan jalan
- Environment yang konsisten antara dev dan production
- Easy rollback: ganti image version, deploy ulang

> ⚠️ **Best Practice**: Jangan simpan password/secret langsung di \`docker-compose.yml\`. Gunakan file \`.env\` yang tidak di-commit ke git!
`,

  '11-cicd.md': `

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

\`\`\`yaml
on: push (branch: main)
  → Test otomatis
  → Build image
  → Deploy ke server
  → Notifikasi Slack/Discord
\`\`\`

> 💡 Dengan CI/CD yang baik, Anda bisa deploy berkali-kali dalam sehari dengan aman karena setiap deploy sudah melalui automated testing.
`,

  '12-monitoring.md': `

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

\`\`\`
Metrics: Node Exporter → Prometheus → Grafana (Dashboard)
Logs:    Promtail → Loki → Grafana (Log Viewer)
Uptime:  Uptime Kuma → Alert ke Telegram/Slack
\`\`\`

> 💡 **Uptime Kuma** adalah pilihan terbaik untuk monitoring sederhana — gratis, self-hosted, dan bisa notifikasi ke Telegram!
`,

  '13-backup.md': `

---

## 💾 Backup: Asuransi Data Anda

**"Backup bukan tentang IF server crash, tapi WHEN."**

Tanpa backup, satu kesalahan perintah \`rm -rf\` bisa menghancurkan data yang dibangun bertahun-tahun.

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

\`\`\`bash
# Script backup harian ke S3/Cloudflare R2
pg_dump dbname | gzip | rclone rcat remote:bucket/db-$(date +%Y%m%d).sql.gz
\`\`\`

> ⚠️ **Yang paling sering dilupakan**: Test restore! Backup yang tidak pernah dicoba restore = tidak ada backup. Lakukan drill restore minimal 1 bulan sekali.
`
};

const files = fs.readdirSync(contentDir);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Strip previous expansions
    content = content.split('\n---\n')[0];
    if (expansions[file]) {
      content += '\n' + expansions[file];
      fs.writeFileSync(filePath, content);
      console.log(`✅ Expanded: ${file}`);
    }
  }
});
console.log('Done!');
