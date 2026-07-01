---
title: Ubuntu20.02编译Apache2.4.62
summary: How to complie Apace in Ubuntu 20.02
date: 2026-06-30
---

解压

```jsx
tar -zxvf httpd-2.4.62.tar.gz
cd httpd-2.4.62
cd srclib
tar -zxvf apr-1.7.5.tar.gz
tar -zxvf apr-util-1.6.3.tar.gz
mv apr-1.7.5/ apr
mv apr-util-1.6.3/ apr-util
```

安装编译依赖

```jsx
apt install build-essential libpcre3 libpcre3-dev libssl-dev libexpat1-dev libapr1-dev libaprutil1-dev libnghttp2-dev lynx -y
```

编译

```jsx
cd httpd-2.4.62
./configure --prefix=/etc/apache2 --enable-so --enable-http2
make
make install
/etc/apache2/bin/httpd -v
```

配置apachectl服务

```jsx
echo 'export PATH=$PATH:/etc/apache2/bin' >> ~/.bash_profile
source ~/.bash_profile
```

配置apachectl status

```jsx
vim /etc/apache2/conf/httpd.conf
```

在最底下加上

```jsx
<location /server-status>
SetHandler server-status
Order Deny,Allow
Deny from nothing
Allow from all
</location>
ExtendedStatus on
```

apachectl restart

**虚拟机配置直接写在httpd.conf里**

```jsx
<VirtualHost *:80>

DocumentRoot "/var/www/nextcloud"
ServerName  10.0.0.155

<Directory /var/www/nextcloud>
Require all granted
AllowOverride All
Options FollowSymLinks MultiViews

<IfModule mod_dav.c>
  Dav off
</IfModule>
</Directory>

</VirtualHost>
```