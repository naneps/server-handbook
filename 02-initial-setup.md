# 02. Initial Setup

Bagian ini dipakai saat baru pertama kali login ke VPS.

## Login Awal

```bash
ssh root@IP_VPS
```

Jika memakai key:

```bash
ssh -i ~/.ssh/id_ed25519 root@IP_VPS
```

## Cek Informasi Sistem

```bash
cat /etc/os-release
uname -a
hostnamectl
uptime
```

## Cek Resource

```bash
free -h
df -h
top
htop
```

## Update Sistem

```bash
apt update && apt upgrade -y
```

## Install Utility Dasar

```bash
apt install -y curl wget git unzip zip vim nano net-tools ca-certificates gnupg lsb-release
```

## Set Timezone

```bash
timedatectl set-timezone Asia/Jakarta
```

## Set Hostname

```bash
hostnamectl set-hostname vps-prod-01
```

## Buat User Non-Root

```bash
adduser deploy
usermod -aG sudo deploy
```

## Pasang SSH Key

Di mesin lokal:

```bash
ssh-keygen -t ed25519
ssh-copy-id deploy@IP_VPS
```

## Nonaktifkan Login Root

Edit `/etc/ssh/sshd_config`:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart:

```bash
systemctl restart ssh
```

## Cek Port Terbuka

```bash
ss -tulpn
```