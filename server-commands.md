# Команды настройки сервера для demo1.websmith-shop.com

## 1. Создание директории сайта
```bash
sudo mkdir -p /var/www/demo1.websmith-shop.com
sudo chown -R $USER:$USER /var/www/demo1.websmith-shop.com
sudo chmod -R 755 /var/www/demo1.websmith-shop.com
```

## 2. Создание конфигурации nginx
```bash
sudo nano /etc/nginx/sites-available/demo1.websmith-shop.com
```

Содержимое файла:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name demo1.websmith-shop.com;
    
    root /var/www/demo1.websmith-shop.com;
    index index.html index.htm;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Handle Vue Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security: deny access to hidden files
    location ~ /\. {
        deny all;
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## 3. Активация сайта
```bash
sudo ln -sf /etc/nginx/sites-available/demo1.websmith-shop.com /etc/nginx/sites-enabled/
```

## 4. Проверка и перезагрузка nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Настройка DNS (если нужно)
Добавить A-запись:
```
demo1.websmith-shop.com -> IP_ВАШЕГО_СЕРВЕРА
```

## 6. SSL сертификат (Let's Encrypt)
```bash
sudo certbot --nginx -d demo1.websmith-shop.com
```

## 7. Проверка статуса
```bash
sudo systemctl status nginx
sudo nginx -t
```

## 8. Логи
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
