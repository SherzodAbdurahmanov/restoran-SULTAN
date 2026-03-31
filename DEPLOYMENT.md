# Руководство по развертыванию Sultan Restaurant

Пошаговое руководство для развертывания сайта на различных платформах.

## Быстрый старт

Проект полностью независим от Bolt.new и может быть развернут на любом хостинге.

## Перед началом

Убедитесь, что у вас есть:
- ✅ Node.js 18+ и npm установлены
- ✅ Аккаунт Supabase (создан проект и настроены API ключи)
- ✅ Telegram Bot Token и Chat ID
- ✅ Заполненный `.env` файл

Если что-то не настроено, см. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

## Развертывание на Vercel (Рекомендуется)

Vercel - самый простой способ развернуть React приложение.

### Через Vercel CLI

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Войдите в аккаунт:
```bash
vercel login
```

3. Разверните проект:
```bash
vercel
```

4. Следуйте инструкциям в терминале

5. Добавьте переменные окружения:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

6. Для production деплоя:
```bash
vercel --prod
```

### Через Vercel Dashboard

1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите "Import Project"
3. Подключите ваш Git репозиторий
4. Vercel автоматически определит настройки Vite
5. Добавьте Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Нажмите "Deploy"

**Плюсы Vercel:**
- ✅ Автоматический деплой при push в Git
- ✅ Бесплатный SSL сертификат
- ✅ CDN по всему миру
- ✅ Preview deployments для каждой ветки

---

## Развертывание на Netlify

### Через Netlify CLI

1. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Войдите в аккаунт:
```bash
netlify login
```

3. Соберите проект:
```bash
npm run build
```

4. Разверните:
```bash
netlify deploy --prod
```

5. Следуйте инструкциям для настройки сайта

### Через Netlify Dashboard

1. Перейдите на [netlify.com](https://netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Подключите Git репозиторий
4. Настройки:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Добавьте Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Нажмите "Deploy site"

**Плюсы Netlify:**
- ✅ Простая настройка
- ✅ Бесплатный план
- ✅ Автоматический деплой
- ✅ Отличная документация

---

## Развертывание на собственном VPS/сервере

### Требования
- Ubuntu 20.04+ (или другая Linux система)
- Nginx или Apache
- Node.js 18+
- PM2 (для управления процессами)

### Шаг 1: Подготовка сервера

```bash
# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Установите Nginx
sudo apt install -y nginx

# Установите Git
sudo apt install -y git
```

### Шаг 2: Клонирование проекта

```bash
# Создайте директорию для сайта
sudo mkdir -p /var/www/sultan-restaurant
cd /var/www/sultan-restaurant

# Клонируйте репозиторий
sudo git clone <your-repository-url> .

# Установите зависимости
sudo npm install
```

### Шаг 3: Настройка переменных окружения

```bash
# Создайте .env файл
sudo nano .env

# Добавьте ваши переменные:
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here

# Сохраните файл (Ctrl+X, затем Y, затем Enter)
```

### Шаг 4: Сборка проекта

```bash
sudo npm run build
```

### Шаг 5: Настройка Nginx

Создайте конфигурационный файл:

```bash
sudo nano /etc/nginx/sites-available/sultan-restaurant
```

Вставьте следующую конфигурацию:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;

    root /var/www/sultan-restaurant/dist;
    index index.html;

    # Логи
    access_log /var/log/nginx/sultan-restaurant-access.log;
    error_log /var/log/nginx/sultan-restaurant-error.log;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Основные настройки
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Активируйте конфигурацию:

```bash
# Создайте символическую ссылку
sudo ln -s /etc/nginx/sites-available/sultan-restaurant /etc/nginx/sites-enabled/

# Проверьте конфигурацию
sudo nginx -t

# Перезапустите Nginx
sudo systemctl restart nginx
```

### Шаг 6: Настройка SSL (HTTPS)

Используйте Let's Encrypt для бесплатного SSL:

```bash
# Установите Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot автоматически настроит HTTPS
```

Сертификат будет автоматически обновляться.

### Шаг 7: Настройка автоматического обновления

Создайте скрипт обновления:

```bash
sudo nano /var/www/sultan-restaurant/deploy.sh
```

Вставьте:

```bash
#!/bin/bash
cd /var/www/sultan-restaurant
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
echo "Deployment completed at $(date)"
```

Сделайте скрипт исполняемым:

```bash
sudo chmod +x /var/www/sultan-restaurant/deploy.sh
```

Теперь для обновления сайта просто запускайте:

```bash
sudo /var/www/sultan-restaurant/deploy.sh
```

### Мониторинг и логи

```bash
# Проверить статус Nginx
sudo systemctl status nginx

# Просмотр логов доступа
sudo tail -f /var/log/nginx/sultan-restaurant-access.log

# Просмотр логов ошибок
sudo tail -f /var/log/nginx/sultan-restaurant-error.log
```

---

## Развертывание через Docker

### Dockerfile

Создайте `Dockerfile` в корне проекта:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf для Docker

Создайте `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

### Запуск

```bash
# Сборка образа
docker-compose build

# Запуск контейнера
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

---

## Развертывание на Cloudflare Pages

1. Перейдите на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Нажмите "Create a project"
3. Подключите Git репозиторий
4. Настройки:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Добавьте Environment variables
6. Нажмите "Save and Deploy"

**Плюсы Cloudflare Pages:**
- ✅ Бесплатный план
- ✅ Отличная производительность
- ✅ Встроенный CDN
- ✅ Неограниченная пропускная способность

---

## Проверка после развертывания

После развертывания проверьте:

- [ ] Сайт открывается по вашему домену
- [ ] Все изображения загружаются
- [ ] Навигация работает (переходы между страницами)
- [ ] Можно добавить товар в корзину
- [ ] Форма оформления заказа работает
- [ ] Заказы приходят в Telegram
- [ ] Сайт корректно отображается на мобильных устройствах
- [ ] HTTPS работает (если настроен SSL)

---

## Устранение проблем

### Проблема: Страница не загружается

**Решение:**
- Проверьте, что build прошел успешно
- Убедитесь, что веб-сервер настроен на обслуживание SPA (single-page application)
- Проверьте логи сервера

### Проблема: Заказы не отправляются в Telegram

**Решение:**
- Проверьте, что Edge Function развернута на Supabase
- Убедитесь, что секреты (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) установлены
- Проверьте, что вы нажали Start в Telegram боте
- Посмотрите логи Edge Function в Supabase Dashboard

### Проблема: CORS ошибки

**Решение:**
- Добавьте ваш домен в CORS настройки Supabase
- Убедитесь, что Edge Function возвращает правильные CORS заголовки

### Проблема: Переменные окружения не работают

**Решение:**
- Убедитесь, что переменные начинаются с `VITE_`
- Пересоберите проект после изменения `.env`
- Проверьте, что переменные добавлены в настройки хостинга

---

## Поддержка

Если вы столкнулись с проблемами при развертывании, проверьте:

1. Логи сервера/хостинга
2. Консоль браузера на наличие ошибок
3. Supabase Edge Function логи
4. Настройки DNS (если используете свой домен)

## Полезные команды

```bash
# Локальное тестирование production сборки
npm run build && npm run preview

# Проверка типов TypeScript
npm run typecheck

# Линтинг кода
npm run lint

# Очистка кэша и node_modules
rm -rf node_modules dist .vite
npm install
```

---

Готово! Ваш сайт полностью независим от Bolt.new и готов к развертыванию на любой платформе.
