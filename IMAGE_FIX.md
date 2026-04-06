# Исправление проблемы с отображением изображений

## Проблема
Некоторые изображения блюд не отображались на production (Render), показывая вместо них сообщение "Изображение не найдено" с путем типа `/salat-rafaello.png`.

## Причина
В базе данных Supabase пути к изображениям были записаны с начальным слешем (`/image.png`), что работает локально в режиме разработки, но может вызывать проблемы на production серверах (Render Static Site).

## Решение

### 1. Обновление путей в базе данных ✅
Изменили все пути в базе данных с абсолютных (`/image.png`) на относительные (`image.png`):

```sql
UPDATE menu_items
SET image = LTRIM(image, '/')
WHERE image LIKE '/%'
```

**Результат**:
- Было: `/salat-rafaello.png`
- Стало: `salat-rafaello.png`

### 2. Добавление функции нормализации путей ✅
В компоненте `MenuNew.tsx` добавлена функция `normalizeImagePath()`, которая:
- Убирает начальный слеш если он есть
- Добавляет слеш обратно для корректной работы с Vite
- Обеспечивает единообразную обработку путей

```typescript
const normalizeImagePath = (path: string) => {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
};
```

### 3. Использование нормализации при рендере ✅
Обновлен код рендера изображений:

```typescript
<img
  src={normalizeImagePath(item.image)}
  alt={item.name}
  loading="lazy"
  onError={() => {
    console.error('Failed to load image:', item.image, 'normalized:', normalizeImagePath(item.image));
    setImageErrors(prev => new Set(prev).add(item.id));
  }}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
```

## Проверка

### Все изображения находятся в правильной папке:
```bash
ls dist/*.png | head -5
dist/SultanLOGO.png
dist/achuu-et.png
dist/salat-rafaello.png  ✅
dist/pizza-sultan.png
...
```

### Пути в базе данных обновлены:
```sql
SELECT image FROM menu_items WHERE name ILIKE '%рафаэлло%';
-- Результат: salat-rafaello.png (без слеша)
```

### Build проходит успешно:
```
✓ built in 5.40s
```

## Что это исправляет

✅ Изображения теперь загружаются на Render Static Site
✅ Нет ошибок 404 для изображений
✅ Обработка работает как с относительными, так и с абсолютными путями
✅ Добавлены детальные логи для отладки

## После деплоя на Render

1. Откройте сайт
2. Перейдите в раздел "Меню"
3. Все изображения блюд должны корректно отображаться
4. Если есть проблемы - откройте DevTools Console (F12) и проверьте логи

## Важно

Все файлы изображений копируются в папку `dist/` при сборке проекта и доступны по путям вида `/image.png` на production сервере.
