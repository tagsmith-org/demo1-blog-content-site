#!/bin/bash

# Исправление 403 Forbidden ошибки для demo1.websmith-shop.com

echo "Исправление 403 ошибки и настройка прав доступа..."

SITE_DIR="/var/www/demo1.websmith-shop.com"

# Проверяем существование директории
if [ ! -d "$SITE_DIR" ]; then
    echo "Создаем директорию сайта..."
    sudo mkdir -p $SITE_DIR
fi

# Устанавливаем правильные права
echo "Устанавливаем права доступа..."
sudo chown -R www-data:www-data $SITE_DIR
sudo chmod -R 755 $SITE_DIR

# Проверяем наличие index.html
if [ ! -f "$SITE_DIR/index.html" ]; then
    echo "Создаем временный index.html..."
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
    <p>Сайт готов к деплою</p>
</body>
</html>
EOF
fi

# Проверяем права на index.html
sudo chown www-data:www-data $SITE_DIR/index.html
sudo chmod 644 $SITE_DIR/index.html

# Проверяем конфигурацию nginx
echo "Проверяем конфигурацию nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Перезагружаем nginx..."
    sudo systemctl reload nginx
    echo "✅ 403 ошибка исправлена!"
    echo "Права доступа настроены правильно."
else
    echo "❌ Ошибка в конфигурации nginx"
    exit 1
fi

# Показываем статус
echo ""
echo "Статус nginx:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "Права директории:"
ls -la $SITE_DIR/

echo ""
echo "Проверьте сайт: http://demo1.websmith-shop.com"
