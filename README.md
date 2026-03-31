# Sultan Restaurant - Веб-сайт ресторана

Современный веб-сайт ресторана Sultan с онлайн-меню, корзиной покупок и системой оформления заказов.

## Технологический стек

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Backend**: Supabase (база данных + Edge Functions)
- **Notifications**: Telegram Bot API

## Возможности

- Адаптивный дизайн для всех устройств (мобильные, планшеты, десктопы)
- Интерактивное меню с категориями
- Корзина покупок
- Система оформления заказов
- Отправка заказов в Telegram
- Интеграция с WhatsApp для бронирования

## Требования для развертывания

- Node.js 18+ и npm
- Аккаунт Supabase (бесплатный план подходит)
- Telegram Bot Token (для получения заказов)
- Сервер с поддержкой Node.js или хостинг (Vercel, Netlify, и т.д.)

## Установка и настройка

### 1. Клонирование проекта

```bash
git clone <your-repository-url>
cd project
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта:

```bash
cp .env.example .env
```

Заполните следующие переменные:

```env
# Supabase настройки
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Telegram Bot настройки
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 3. Настройка Supabase

1. Создайте бесплатный аккаунт на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте URL проекта и Anon Key из Settings → API
4. Установите Supabase CLI (опционально, для локальной разработки):

```bash
npm install -g supabase
```

### 4. Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Получите токен бота
3. Узнайте свой Chat ID (можно через [@userinfobot](https://t.me/userinfobot))
4. Добавьте эти данные в `.env` файл

### 5. Развертывание Edge Function

Edge Function используется для отправки заказов в Telegram.

Для развертывания на Supabase:

```bash
# Войдите в Supabase CLI
supabase login

# Свяжите проект
supabase link --project-ref your-project-ref

# Установите секреты
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
supabase secrets set TELEGRAM_CHAT_ID=your_chat_id

# Разверните функцию
supabase functions deploy send-order
```

Альтернативно, можно использовать Supabase Dashboard для ручного развертывания.

## Локальная разработка

```bash
# Запуск dev сервера
npm run dev

# Сборка проекта
npm run build

# Предпросмотр production сборки
npm run preview

# Проверка типов TypeScript
npm run typecheck

# Линтинг кода
npm run lint
```

## Развертывание на production

### Вариант 1: Vercel

1. Установите Vercel CLI: `npm i -g vercel`
2. Запустите: `vercel`
3. Добавьте переменные окружения в Vercel Dashboard
4. Готово!

### Вариант 2: Netlify

1. Установите Netlify CLI: `npm i -g netlify-cli`
2. Запустите: `netlify deploy --prod`
3. Добавьте переменные окружения в Netlify Dashboard
4. Готово!

### Вариант 3: Свой сервер (Nginx)

1. Соберите проект:

```bash
npm run build
```

2. Скопируйте содержимое папки `dist` на ваш сервер

3. Настройте Nginx конфигурацию:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. Перезапустите Nginx:

```bash
sudo systemctl restart nginx
```

### Вариант 4: Docker

Создайте `Dockerfile`:

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

Сборка и запуск:

```bash
docker build -t sultan-restaurant .
docker run -p 80:80 sultan-restaurant
```

## Структура проекта

```
project/
├── public/                 # Статические файлы (изображения блюд)
├── src/
│   ├── components/        # React компоненты
│   │   └── Layout.tsx    # Главный layout с навигацией
│   ├── context/          # React контексты
│   │   └── CartContext.tsx  # Управление корзиной
│   ├── pages/            # Страницы приложения
│   │   ├── Home.tsx      # Главная страница
│   │   ├── Menu.tsx      # Страница меню
│   │   ├── Cart.tsx      # Корзина
│   │   └── Checkout.tsx  # Оформление заказа
│   ├── types/            # TypeScript типы
│   │   └── menu.ts       # Типы для меню
│   ├── App.tsx           # Главный компонент
│   ├── main.tsx          # Точка входа
│   └── index.css         # Глобальные стили
├── supabase/
│   └── functions/
│       └── send-order/   # Edge Function для отправки заказов
└── package.json
```

## Настройка меню

Меню находится в файле `src/pages/Menu.tsx`. Каждое блюдо имеет следующую структуру:

```typescript
{
  id: 1,
  name: 'Название блюда',
  description: 'Описание блюда',
  price: '350 сом',
  image: '/path-to-image.png',
  category: 'salads' // или другая категория
}
```

Категории:
- `salads` - Салаты
- `hot-dishes` - Горячие блюда
- `grilled` - Мангал
- `soups` - Супы
- `pizza` - Пицца
- `desserts` - Десерты
- `drinks` - Напитки

## Обновление контактной информации

Контактные данные находятся в компоненте `src/components/Layout.tsx`:

- Телефон: строка 71, 155
- Email: строка 82, 159
- Адрес: строка 94, 157
- Часы работы: строка 106
- WhatsApp ссылка: строка 39, 119

## Поддержка

Если у вас возникли вопросы или проблемы с развертыванием, проверьте:

1. Все ли переменные окружения правильно настроены
2. Развернута ли Edge Function на Supabase
3. Работает ли Telegram Bot
4. Правильно ли настроены CORS заголовки

## Лицензия

Все права защищены © 2025 Sultan Restaurant
