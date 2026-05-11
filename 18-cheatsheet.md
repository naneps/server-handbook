# 18. Command Cheat Sheet

## System

```bash
uname -a
hostnamectl
uptime
whoami
free -h
df -h
top
htop
```

## Network

```bash
ip a
ip route
ss -tulpn
ping -c 4 google.com
curl ifconfig.me
dig example.com
```

## Service

```bash
systemctl status nginx
systemctl restart nginx
systemctl enable nginx
journalctl -u nginx -n 100 --no-pager
```

## Package

```bash
apt update
apt upgrade -y
apt install nama-package -y
apt remove nama-package -y
apt autoremove -y
```

## Firewall

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw status verbose
```

## File

```bash
ls -lah
cd /path
cp file1 file2
mv file1 file2
rm file
tar -czf archive.tar.gz folder/
rsync -avz source/ destination/
```

## User

```bash
adduser deploy
usermod -aG sudo deploy
passwd deploy
```

## Database

```bash
mysql -u root -p
psql -U postgres
pg_dump -U user dbname
mysqldump -u root -p dbname
```