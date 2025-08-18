#!/bin/bash

# Финальное исправление 403 ошибки

echo "🔧 Финальное исправление 403 ошибки..."

SITE_DIR="/var/www/demo1.websmith-shop.com"

# 1. Проверяем и создаем директорию
if [ ! -d "$SITE_DIR" ]; then
    echo "Создаем директорию..."
    sudo mkdir -p $SITE_DIR
fi

# 2. Создаем рабочий index.html
echo "Создаем index.html..."
sudo tee $SITE_DIR/index.html > /dev/null <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>demo1.websmith-shop.com</title>
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
        <h1>demo1.websmith-shop.com</h1>
        <p>✅ Сайт работает!</p>
        <p>Готов к деплою Vue.js приложения</p>
    </div>
</body>
</html>
EOF

# 3. Устанавливаем правильные права
echo "Устанавливаем права доступа..."
sudo chown -R www-data:www-data $SITE_DIR
sudo chmod -R 755 $SITE_DIR
sudo find $SITE_DIR -type f -exec chmod 644 {} \;

# 4. Проверяем права
echo "Проверяем права:"
ls -la $SITE_DIR/

# 5. Проверяем конфигурацию nginx
echo "Проверяем nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Перезагружаем nginx..."
    sudo systemctl reload nginx
    
    # 6. Тестируем локально
    echo "Тестируем локально..."
    sleep 2
    curl -I http://localhost/ 2>/dev/null
    
    echo ""
    echo "✅ Исправление завершено!"
    echo "Проверьте: https://demo1.websmith-shop.com"
else
    echo "❌ Ошибка в конфигурации nginx"
    exit 1
fi
