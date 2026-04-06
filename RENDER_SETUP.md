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

**КРИТИЧЕСКИ ВАЖНО**: В разделе "Environment" добавьте следующие переменные окружения:

```
VITE_SUPABASE_URL=https://ndhcosintwnmmswyjnzd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaGNvc2ludHdubW1zd3lqbnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjM0NjAsImV4cCI6MjA5MDQzOTQ2MH0.v2l6D2EHdrG8m9b2L6AE56nLs5KcnFUg71xqBXeAsyY
```

**ВАЖНО**:
- Используйте именно префикс `VITE_` для всех фронтенд переменных
- БЕЗ этих переменных приложение будет работать, но БЕЗ функционала базы данных (меню будет пустым)
- Чтобы добавить переменные окружения на Render:
  1. Перейдите в настройки вашего Static Site
  2. Найдите секцию "Environment"
  3. Нажмите "Add Environment Variable"
  4. Добавьте каждую переменную отдельно (Key: VITE_SUPABASE_URL, Value: ваше значение)

### 3. Деплой

После настройки нажмите "Create Static Site". Render автоматически:
- Клонирует репозиторий
- Установит зависимости (`npm install`)
- Выполнит билд (`npm run build`)
- Задеплоит содержимое папки `dist`

**Время сборки**: обычно 2-5 минут

### 4. Проверка работоспособности

После успешного деплоя:

1. **Откройте сайт** по URL из Render Dashboard

2. **Откройте DevTools** (F12) и перейдите на вкладку Console

3. **Проверьте логи**:
   ```
   App starting...
   Environment variables: { VITE_SUPABASE_URL: 'set', VITE_SUPABASE_ANON_KEY: 'set' }
   ```

   - Если переменные показывают `'not set'` - вернитесь к шагу 2
   - Если переменные `'set'` но меню пустое - проверьте что данные есть в Supabase

4. **Проверьте функционал**:
   - ✅ Главная страница загружается
   - ✅ Меню (/menu) показывает блюда
   - ✅ Корзина работает
   - ✅ Навигация между страницами работает

### Решение проблем

#### Черный экран после деплоя

**Причина**: Обычно это проблема с environment variables или ошибка JavaScript

**Решение**:
1. Откройте DevTools Console (F12)
2. Посмотрите на ошибки в консоли
3. Проверьте что environment variables установлены (см. логи в консоли)
4. Если переменных нет - добавьте их и сделайте Manual Deploy:
   - Dashboard → ваш сайт → Manual Deploy → Clear build cache & deploy

#### Меню пустое (нет блюд)

**Причина**: Environment variables не настроены ИЛИ база данных пуста

**Решение**:
1. Проверьте Console - должны быть логи: `Supabase not configured` или `Loaded menu items: 0`
2. Если `not configured` - добавьте environment variables
3. Если `Loaded menu items: 0` - заполните базу данных через админ-панель

#### 404 при переходе по роутам

**Причина**: Отсутствует файл `_redirects`

**Решение**:
- Файл `public/_redirects` должен существовать в проекте
- Содержимое: `/*    /index.html   200`
- Этот файл уже создан, но проверьте что он скопировался в `dist` после build

#### Build падает с ошибкой

**Решение**:
1. Проверьте логи сборки в Render Dashboard
2. Убедитесь что Build Command правильный: `npm install && npm run build`
3. Попробуйте Clear build cache & deploy

## Автоматический редеплой

Render автоматически пересобирает и деплоит сайт при каждом push в основную ветку GitHub.

## Поддержка

Если проблема сохраняется:
1. Проверьте Console в браузере на ошибки
2. Проверьте логи деплоя в Render Dashboard
3. Убедитесь что все environment variables установлены корректно
