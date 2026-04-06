# Настройка деплоя на Render

## Шаги для деплоя Static Site на Render

### 1. Создание Static Site

1. Зайдите на [Render Dashboard](https://dashboard.render.com/)
2. Нажмите "New +" → "Static Site"
3. Подключите ваш GitHub репозиторий
4. Настройте параметры:
   - **Name**: `sultan-restaurant` (или любое другое имя)
   - **Branch**: `main` (или ваша основная ветка)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 2. Настройка Environment Variables

В разделе "Environment" добавьте следующие переменные окружения:

```
VITE_SUPABASE_URL=https://ndhcosintwnmmswyjnzd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaGNvc2ludHdubW1zd3lqbnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjM0NjAsImV4cCI6MjA5MDQzOTQ2MH0.v2l6D2EHdrG8m9b2L6AE56nLs5KcnFUg71xqBXeAsyY
```

**ВАЖНО**: Используйте именно префикс `VITE_` для всех фронтенд переменных!

### 3. Деплой

После настройки нажмите "Create Static Site". Render автоматически:
- Клонирует репозиторий
- Установит зависимости
- Выполнит билд
- Задеплоит сайт

### 4. Проверка

После успешного деплоя:
1. Откройте URL вашего сайта (будет показан в Render Dashboard)
2. Проверьте что:
   - Сайт загружается без черного экрана
   - Роуты работают (/, /menu, /cart, и т.д.)
   - Меню загружается из Supabase
   - Функционал корзины работает

### Решение проблем

#### Черный экран
- Проверьте Console в DevTools браузера на наличие ошибок
- Убедитесь что Environment Variables добавлены с префиксом `VITE_`
- Проверьте что Build Command и Publish Directory указаны правильно

#### 404 при навигации по роутам
- Файл `public/_redirects` должен быть в проекте
- Содержимое: `/*    /index.html   200`

#### Меню не загружается
- Проверьте что переменные Supabase правильно настроены
- Откройте Network tab в DevTools и проверьте запросы к Supabase

## Автоматический редеплой

Render автоматически пересобирает и деплоит сайт при каждом push в основную ветку GitHub.
