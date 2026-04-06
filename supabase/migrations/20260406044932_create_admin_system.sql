/*
  # Создание системы администрирования ресторана Sultan

  ## Описание
  Создаётся полная система управления рестораном с ролями пользователей,
  блюдами и контролем доступа на уровне базы данных.

  ## Новые таблицы

  ### `profiles`
  - `id` (uuid, primary key) - связан с auth.users
  - `email` (text) - email пользователя
  - `role` (text) - роль пользователя (admin/user)
  - `created_at` (timestamptz) - дата создания
  - `updated_at` (timestamptz) - дата обновления

  ### `menu_items`
  - `id` (uuid, primary key) - уникальный ID блюда
  - `name` (text) - название блюда
  - `description` (text) - описание блюда
  - `price` (text) - цена блюда
  - `category` (text) - категория (salads, main, desserts, etc)
  - `image` (text) - путь к изображению
  - `is_available` (boolean) - доступно ли блюдо для заказа
  - `created_at` (timestamptz) - дата добавления
  - `updated_at` (timestamptz) - дата обновления

  ## Безопасность

  ### RLS для `profiles`
  - Все пользователи могут читать свой профиль
  - Только сам пользователь может обновлять свой профиль (кроме роли)
  - Только администраторы могут изменять роли

  ### RLS для `menu_items`
  - Все пользователи (включая неавторизованных) могут читать доступные блюда
  - Только администраторы могут добавлять, изменять и удалять блюда
  - Обычные пользователи не могут изменять статус is_available

  ## Важные замечания
  - Роль администратора хранится в таблице profiles
  - Первого администратора нужно создать вручную после миграции
  - Все операции с блюдами защищены RLS политиками
*/

-- Создание таблицы профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Создание таблицы блюд меню
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Функция для проверки роли администратора
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Включение RLS для таблиц
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы profiles

-- Все авторизованные пользователи могут читать свой профиль
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Администраторы могут видеть все профили
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin());

-- Пользователи могут создавать свой профиль при регистрации
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id AND role = 'user');

-- Пользователи могут обновлять свой профиль (кроме роли)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Только администраторы могут изменять роли
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Политики для таблицы menu_items

-- Все (включая неавторизованных) могут читать блюда
CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  TO public
  USING (true);

-- Только администраторы могут добавлять блюда
CREATE POLICY "Admins can insert menu items"
  ON menu_items FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Только администраторы могут обновлять блюда
CREATE POLICY "Admins can update menu items"
  ON menu_items FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Только администраторы могут удалять блюда
CREATE POLICY "Admins can delete menu items"
  ON menu_items FOR DELETE
  TO authenticated
  USING (is_admin());

-- Функция для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания профиля
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
