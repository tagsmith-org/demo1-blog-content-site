# Быстрые команды для исправления 403 ошибки

## 1. Запустите диагностику
```bash
chmod +x debug-server.sh
./debug-server.sh
```

## 2. Или выполните команды вручную:

### Проверка директории
```bash
ls -la /var/www/demo1.websmith-shop.com/
```

### Создание директории если не существует
```bash
sudo mkdir -p /var/www/demo1.websmith-shop.com
sudo chown www-data:www-data /var/www/demo1.websmith-shop.com
sudo chmod 755 /var/www/demo1.websmith-shop.com
```

### Создание базового index.html
```bash
sudo tee /var/www/demo1.websmith-shop.com/index.html > /dev/null <<EOF
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
```

### Установка правильных прав
```bash
sudo chown www-data:www-data /var/www/demo1.websmith-shop.com/index.html
sudo chmod 644 /var/www/demo1.websmith-shop.com/index.html
```

### Проверка конфигурации nginx
```bash
sudo nginx -t
```

### Перезагрузка nginx
```bash
sudo systemctl reload nginx
```

### Проверка логов
```bash
sudo tail -f /var/log/nginx/error.log
```

## 3. Проверка результата
```bash
curl -I https://demo1.websmith-shop.com/
```

## 4. Если все еще 403, проверьте:
- Существует ли конфигурация nginx
- Правильно ли настроен SSL сертификат
- Нет ли конфликтов с другими сайтами
