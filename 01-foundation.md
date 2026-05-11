# 01. Foundation

Bagian ini menjelaskan konsep dasar VPS dan prinsip operasional yang wajib dipahami sebelum masuk ke setup dan deployment.

## Apa itu VPS

VPS (Virtual Private Server) adalah server virtual yang punya resource sendiri seperti CPU, RAM, storage, dan IP publik.
VPS cocok untuk:

- website
- API/backend
- database
- worker/queue
- reverse proxy
- tools internal

## Prinsip Operasional

- Jangan gunakan root untuk aktivitas harian.
- Selalu backup sebelum perubahan besar.
- Update sistem secara rutin.
- Jangan buka port yang tidak perlu.
- Gunakan SSH key, bukan password.
- Simpan secret di tempat aman.
- Pantau log dan resource server.

## Terminologi Dasar

- **SSH**: akses remote server
- **sudo**: menjalankan command admin
- **service / daemon**: proses yang berjalan di background
- **systemd**: manager service di Linux modern
- **reverse proxy**: perantara request ke backend
- **SSL/TLS**: enkripsi trafik web
- **port**: pintu layanan jaringan

## Pola Deployment Umum

1. Static frontend di Nginx
2. Backend app di localhost
3. Nginx sebagai reverse proxy
4. Database tidak diekspos publik
5. SSL aktif di domain publik

## Hal yang Harus Ada di Server Production

- user non-root
- firewall aktif
- SSH key login
- SSL certificate
- backup otomatis
- monitoring
- log yang rapi
- recovery plan