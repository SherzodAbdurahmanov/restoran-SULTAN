import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, Search, Filter, AlertCircle, Check, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  is_available: boolean;
}

function Admin() {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'salads', label: 'Салаты' },
    { value: 'soups', label: 'Супы' },
    { value: 'main', label: 'Основные блюда' },
    { value: 'mangal', label: 'Мангал' },
    { value: 'pizza', label: 'Пицца' },
    { value: 'pasta', label: 'Паста' },
    { value: 'desserts', label: 'Десерты' },
    { value: 'drinks', label: 'Напитки' },
  ];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (err) {
      setError('Ошибка загрузки блюд');
      console.error('Error loading menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (itemId: string, currentStatus: boolean) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !currentStatus })
        .eq('id', itemId);

      if (error) throw error;

      setMenuItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, is_available: !currentStatus } : item
        )
      );

      setSuccess('Статус блюда обновлен');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Ошибка обновления статуса блюда');
      console.error('Error updating item:', err);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const availableCount = menuItems.filter(item => item.is_available).length;
  const unavailableCount = menuItems.length - availableCount;

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <header className="bg-zinc-950 border-b border-amber-900/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-500">Админ-панель</h1>
                <p className="text-sm text-amber-100/60 mt-1">
                  Добро пожаловать, {profile?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-2 rounded-xl hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-400">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-950 border border-amber-900/20 rounded-xl p-6">
              <p className="text-amber-100/60 text-sm mb-1">Всего блюд</p>
              <p className="text-3xl font-bold text-amber-500">{menuItems.length}</p>
            </div>
            <div className="bg-zinc-950 border border-green-500/20 rounded-xl p-6">
              <p className="text-amber-100/60 text-sm mb-1">В наличии</p>
              <p className="text-3xl font-bold text-green-500">{availableCount}</p>
            </div>
            <div className="bg-zinc-950 border border-red-500/20 rounded-xl p-6">
              <p className="text-amber-100/60 text-sm mb-1">Недоступно</p>
              <p className="text-3xl font-bold text-red-500">{unavailableCount}</p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-amber-900/20 rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по названию или описанию..."
                  className="w-full pl-12 pr-4 py-3 bg-black border border-amber-900/30 rounded-xl text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
              <div className="relative sm:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black border border-amber-900/30 rounded-xl text-amber-100 focus:outline-none focus:border-amber-600 transition-colors appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-amber-400">Загрузка блюд...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-zinc-950 border border-amber-900/20 rounded-2xl">
              <p className="text-amber-100/60">Блюда не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 border border-amber-900/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-black"
                    />
                    {!item.is_available && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Нет в наличии
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-500 mb-2">{item.name}</h3>
                    <p className="text-amber-100/60 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-400 font-bold text-lg">{item.price}</span>
                      <span className="text-amber-100/40 text-sm capitalize">
                        {categories.find(c => c.value === item.category)?.label || item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleAvailability(item.id, item.is_available)}
                      disabled={updatingItems.has(item.id)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        item.is_available
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {updatingItems.has(item.id) ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Обновление...
                        </>
                      ) : item.is_available ? (
                        <>
                          <Check className="w-5 h-5" />
                          В наличии
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5" />
                          Недоступно
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;
