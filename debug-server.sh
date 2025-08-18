#!/bin/bash

# Диагностика проблем с demo1.websmith-shop.com

echo "🔍 Диагностика сервера demo1.websmith-shop.com"
echo "=============================================="

SITE_DIR="/var/www/demo1.websmith-shop.com"

echo ""
echo "1. Проверка директории сайта:"
echo "============================="
if [ -d "$SITE_DIR" ]; then
    echo "✅ Директория существует: $SITE_DIR"
    echo "Содержимое:"
    ls -la $SITE_DIR/
else
    echo "❌ Директория НЕ существует: $SITE_DIR"
    echo "Создаем директорию..."
    sudo mkdir -p $SITE_DIR
    sudo chown www-data:www-data $SITE_DIR
    sudo chmod 755 $SITE_DIR
fi

echo ""
echo "2. Проверка index.html:"
echo "======================"
if [ -f "$SITE_DIR/index.html" ]; then
    echo "✅ index.html существует"
    echo "Размер: $(ls -lh $SITE_DIR/index.html | awk '{print $5}')"
    echo "Права: $(ls -la $SITE_DIR/index.html | awk '{print $1, $3, $4}')"
    echo "Первые строки:"
    head -5 $SITE_DIR/index.html
else
    echo "❌ index.html НЕ существует"
    echo "Создаем базовый index.html..."
    sudo tee $SITE_DIR/index.html > /dev/null <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>demo1.websmith-shop.com</title>
</head>
<body>
    <h1>demo1.websmith-shop.com</h1>
    <p>Сайт работает!</p>
</body>
</html>
EOF
    sudo chown www-data:www-data $SITE_DIR/index.html
    sudo chmod 644 $SITE_DIR/index.html
fi

echo ""
echo "3. Проверка конфигурации nginx:"
echo "=============================="
if [ -f "/etc/nginx/sites-available/demo1.websmith-shop.com" ]; then
    echo "✅ Конфигурация nginx существует"
    echo "Проверяем синтаксис..."
    sudo nginx -t
else
    echo "❌ Конфигурация nginx НЕ существует"
    echo "Создаем конфигурацию..."
    sudo tee /etc/nginx/sites-available/demo1.websmith-shop.com > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name demo1.websmith-shop.com;
    
    root /var/www/demo1.websmith-shop.com;
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
    sudo ln -sf /etc/nginx/sites-available/demo1.websmith-shop.com /etc/nginx/sites-enabled/
fi

echo ""
echo "4. Проверка статуса nginx:"
echo "========================"
sudo systemctl status nginx --no-pager -l

echo ""
echo "5. Проверка логов nginx:"
echo "======================"
echo "Последние ошибки:"
sudo tail -10 /var/log/nginx/error.log

echo ""
echo "6. Проверка прав доступа:"
echo "========================"
echo "Права на директорию:"
ls -ld $SITE_DIR
echo "Права на файлы:"
ls -la $SITE_DIR/

echo ""
echo "7. Тест подключения:"
echo "=================="
echo "Проверяем доступность сайта локально..."
curl -I http://localhost/ 2>/dev/null || echo "Локальный тест не прошел"

echo ""
echo "🔧 Исправление проблем..."
echo "========================"

# Устанавливаем правильные права
sudo chown -R www-data:www-data $SITE_DIR
sudo chmod -R 755 $SITE_DIR
sudo find $SITE_DIR -type f -exec chmod 644 {} \;

# Перезагружаем nginx
sudo systemctl reload nginx

echo "✅ Диагностика завершена!"
echo "Проверьте сайт: https://demo1.websmith-shop.com"
