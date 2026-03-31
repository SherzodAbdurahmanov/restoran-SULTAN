# Настройка Supabase для Sultan Restaurant

Это подробное руководство по настройке Supabase для полностью независимого развертывания проекта.

## Шаг 1: Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите "Start your project" или "Sign up"
3. Создайте аккаунт (можно через GitHub)
4. После входа нажмите "New project"
5. Заполните форму:
   - **Name**: Sultan Restaurant (или любое имя)
   - **Database Password**: Создайте надежный пароль (сохраните его!)
   - **Region**: Выберите ближайший к вашим пользователям регион
   - **Pricing Plan**: Free (достаточно для старта)
6. Нажмите "Create new project"
7. Дождитесь создания проекта (1-2 минуты)

## Шаг 2: Получение API ключей

1. В левом меню выберите **Settings** (иконка шестеренки)
2. Выберите **API**
3. Скопируйте следующие данные:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Длинный JWT токен

4. Добавьте эти данные в ваш `.env` файл:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Шаг 3: Настройка Edge Function

Edge Function отвечает за отправку заказов в Telegram.

### Вариант A: Через Supabase CLI (Рекомендуется)

1. Установите Supabase CLI:

```bash
npm install -g supabase
```

2. Войдите в аккаунт:

```bash
supabase login
```

3. Свяжите локальный проект с Supabase:

```bash
supabase link --project-ref your-project-ref
```

Где `your-project-ref` - это часть URL вашего проекта (например, из `https://xxxxx.supabase.co` это будет `xxxxx`)

4. Установите секреты для Edge Function:

```bash
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
supabase secrets set TELEGRAM_CHAT_ID=your_chat_id
```

5. Разверните функцию:

```bash
supabase functions deploy send-order
```

6. Проверьте развертывание:

```bash
supabase functions list
```

### Вариант B: Через Dashboard (Если CLI не работает)

1. В Supabase Dashboard откройте **Edge Functions** в левом меню
2. Нажмите **Create a new function**
3. Назовите функцию: `send-order`
4. Скопируйте содержимое файла `supabase/functions/send-order/index.ts` в редактор
5. Нажмите **Deploy function**
6. Перейдите в **Settings** → **Edge Functions** → **Environment variables**
7. Добавьте переменные:
   - `TELEGRAM_BOT_TOKEN`: ваш токен бота
   - `TELEGRAM_CHAT_ID`: ваш chat ID

## Шаг 4: Настройка Telegram Bot

### 4.1. Создание бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота (например: "Sultan Restaurant Orders")
   - Введите username бота (должен заканчиваться на "bot", например: "sultan_orders_bot")
4. BotFather отправит вам токен. Сохраните его! Выглядит так:
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### 4.2. Получение Chat ID

1. Найдите бота [@userinfobot](https://t.me/userinfobot) в Telegram
2. Нажмите Start
3. Бот отправит вам ваш User ID (Chat ID)
4. Скопируйте это число (например: `123456789`)

### 4.3. Добавление данных

Добавьте полученные данные в ваш `.env` файл:

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

И установите как секреты в Supabase (см. Шаг 3).

### 4.4. Тестирование бота

1. Откройте вашего бота в Telegram (по username)
2. Нажмите Start
3. Теперь бот будет отправлять сюда заказы

**Важно**: Вы ОБЯЗАТЕЛЬНО должны нажать Start, иначе бот не сможет отправлять вам сообщения!

## Шаг 5: Проверка настройки

### 5.1. Проверка Edge Function

Проверьте, что функция работает:

```bash
curl -X POST https://your-project-ref.supabase.co/functions/v1/send-order \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "phone": "+123456789",
    "address": "Test address",
    "items": [{"name": "Test item", "quantity": 1, "price": 100, "total": 100}],
    "total": 100
  }'
```

Если все настроено правильно, вы получите сообщение в Telegram.

### 5.2. Проверка в браузере

1. Запустите проект локально: `npm run dev`
2. Откройте сайт в браузере
3. Добавьте товар в корзину
4. Оформите тестовый заказ
5. Проверьте, что заказ пришел в Telegram

## Шаг 6: CORS настройки (если нужно)

Если при отправке заказа возникают CORS ошибки:

1. В Supabase Dashboard откройте **Settings** → **API**
2. Найдите раздел **CORS**
3. Добавьте ваш домен в список разрешенных origin (например: `https://your-domain.com`)
4. Для разработки добавьте: `http://localhost:5173`

## Шаг 7: Миграция на свой сервер

Когда вы захотите перенести проект на свой сервер:

### 7.1. Подготовка файлов

1. Соберите проект:
```bash
npm run build
```

2. Скопируйте папку `dist` на ваш сервер

3. Настройте веб-сервер (Nginx, Apache) для обслуживания статических файлов

### 7.2. Переменные окружения

На production сервере установите переменные окружения одним из способов:

**Вариант A**: Через файл `.env` (если используете Node.js сервер):
```bash
cp .env.example .env
# Заполните .env вашими данными
```

**Вариант B**: Через системные переменные:
```bash
export VITE_SUPABASE_URL=https://xxxxx.supabase.co
export VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Вариант C**: Через панель управления хостингом (Vercel, Netlify и т.д.)

### 7.3. Важные примечания

- **Безопасность**: `.env` файл НЕ должен попадать в Git репозиторий
- **ANON Key**: Это публичный ключ, его можно использовать в браузере
- **Service Role Key**: НЕ используйте Service Role Key в браузере! Только на backend
- **Telegram токены**: Хранятся только на Supabase в секретах Edge Function

## Альтернативы Supabase

Если вы хотите полностью отказаться от Supabase:

1. **Замените Edge Function** на:
   - Backend API на Node.js/Express
   - Cloudflare Workers
   - AWS Lambda
   - Любой другой serverless провайдер

2. **Код для замены** (пример на Express):

```javascript
// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/send-order', async (req, res) => {
  const orderData = req.body;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  let message = `🍽 <b>Новый заказ!</b>\n\n`;
  message += `👤 <b>Имя:</b> ${orderData.name}\n`;
  message += `📞 <b>Телефон:</b> ${orderData.phone}\n`;
  message += `📍 <b>Адрес:</b> ${orderData.address}\n`;
  // ... остальной код

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  res.json({ success: true });
});

app.listen(3000);
```

3. **Обновите** файл `src/pages/Checkout.tsx`:

```typescript
// Замените URL
const apiUrl = `https://your-server.com/api/send-order`;

// Вместо
const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order`;
```

## Поддержка

Если возникли проблемы:

1. Проверьте логи Edge Function в Supabase Dashboard → Edge Functions → Logs
2. Проверьте консоль браузера на наличие ошибок
3. Убедитесь, что все переменные окружения заполнены
4. Проверьте, что вы нажали Start в Telegram боте

## Полезные ссылки

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
