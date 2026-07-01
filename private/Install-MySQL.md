---
title: Install MySQL 5.7 Serve On Ubuntu 20.04
summary: Install MySQL 5.7 Serve On Ubuntu 20.04
date: 2026-06-30
---
Install **MySQL** initial on my Lab Server (Ubuntu 20.04) 4C4G

```bash
wget https://downloads.mysql.com/archives/get/p/23/file/mysql-server_5.7.38-1ubuntu18.04_amd64.deb-bundle.tar
mkdir /home/mysql-deb
tar -xvf mysql-server_5.7.38-1ubuntu18.04_amd64.deb-bundle.tar -C /home/mysql-deb

**(delete test file)**

cd /home/mysql-deb
rm mysql-community-test_5.7.38-1ubuntu18.04_amd64.deb mysql-testsuite_5.7.38-1ubuntu18.04_amd64.deb
apt install libtinfo5 libmecab2 libaio1 libgdbm-compat4 libgdbm6 libnuma1 libperl5.30 libsasl2-2 libsasl2-modules libsasl2-modules-db perl perl-base perl-modules-5.30 psmisc
dpkg -i mysql-*.deb
```

Public access for **MySQL**

```bash
cd /etc/mysql/mysql.conf.d
vim mysqld.cnf
Add a comment before **bind-address**
service mysql restart
mysql -uroot -p
use mysql;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'noc' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit
service mysql restart
```