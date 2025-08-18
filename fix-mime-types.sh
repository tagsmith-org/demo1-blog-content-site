#!/bin/bash

# Быстрое исправление MIME типов для demo1.websmith-shop.com

echo "Исправление MIME типов для JavaScript и TypeScript файлов..."

# Создаем временный файл с правильной конфигурацией
sudo tee /tmp/nginx-fix.conf > /dev/null <<EOF
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

# Копируем исправленную конфигурацию
sudo cp /tmp/nginx-fix.conf /etc/nginx/sites-available/demo1.websmith-shop.com

# Проверяем конфигурацию
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Конфигурация корректна, перезагружаем nginx..."
    sudo systemctl reload nginx
    echo "✅ MIME типы исправлены!"
    echo "Теперь JavaScript и TypeScript файлы будут загружаться правильно."
else
    echo "❌ Ошибка в конфигурации nginx"
    exit 1
fi

# Очищаем временный файл
sudo rm /tmp/nginx-fix.conf
