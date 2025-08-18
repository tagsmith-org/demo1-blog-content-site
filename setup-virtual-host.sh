#!/bin/bash

# Настройка виртуального хоста для demo1.websmith-shop.com

DOMAIN="demo1.websmith-shop.com"
SITE_DIR="/var/www/demo1.websmith-shop.com"

echo "Настройка виртуального хоста для $DOMAIN..."

# Создаем директорию для сайта
sudo mkdir -p $SITE_DIR
sudo chown -R $USER:$USER $SITE_DIR
sudo chmod -R 755 $SITE_DIR

# Создаем конфигурацию nginx
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;
    
    root $SITE_DIR;
    index index.html index.htm;
    
    # MIME types for JavaScript and TypeScript
    location ~* \.js$ {
        add_header Content-Type "application/javascript";
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.ts$ {
        add_header Content-Type "application/javascript";
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.mjs$ {
        add_header Content-Type "application/javascript";
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
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
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
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
EOF

# Активируем сайт
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Проверяем конфигурацию nginx
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Конфигурация nginx корректна"
    sudo systemctl reload nginx
    echo "Nginx перезагружен"
else
    echo "Ошибка в конфигурации nginx"
    exit 1
fi

# Создаем простую страницу для тестирования
sudo tee $SITE_DIR/index.html > /dev/null <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$DOMAIN - Coming Soon</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: #f5f5f5; 
        }
        .container { 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>$DOMAIN</h1>
        <p>Виртуальный хост успешно настроен!</p>
        <p>Сайт готов к деплою.</p>
    </div>
</body>
</html>
EOF

echo "Виртуальный хост $DOMAIN успешно настроен!"
echo "Директория сайта: $SITE_DIR"
echo "Конфигурация: /etc/nginx/sites-available/$DOMAIN"
echo ""
echo "Для настройки SSL сертификата выполните:"
echo "sudo certbot --nginx -d $DOMAIN"
