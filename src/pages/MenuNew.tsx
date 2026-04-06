import { useState, useEffect } from 'react';
import { ShoppingCart, Check, XCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  is_available: boolean;
}

function MenuNew() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('salads');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { addItem } = useCart();

  const categories = [
    { id: 'salads', label: 'Салаты' },
    { id: 'soups', label: 'Первые блюда' },
    { id: 'mainDishes', label: 'Вторые блюда' },
    { id: 'meet', label: 'Мясо из казана' },
    { id: 'steaks', label: 'Стейки' },
    { id: 'shashlyk', label: 'Шашлыки' },
    { id: 'custom', label: 'Блюда на заказ' },
    { id: 'fastfood', label: 'Фаст Фуд' },
    { id: 'pizza', label: 'Пиццы' },
    { id: 'rolls', label: 'Роллы' },
    { id: 'desserts', label: 'Десерты' },
    { id: 'vafli', label: 'Венские вафли' },
    { id: 'lemonade', label: 'Лимонады' },
    { id: 'iceCream', label: 'Мороженое' }
  ];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured - menu will be empty');
        setMenuItems([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      console.log('Loaded menu items:', data?.length);
      console.log('Sample item:', data?.[0]);

      setMenuItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!item.is_available) {
      return;
    }

    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });

    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const getCategoryTitle = () => {
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.label : '';
  };

  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-500 mb-4 sm:mb-6">
            Наше меню
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-100/80 max-w-2xl mx-auto">
            Откройте для себя изысканные блюда, приготовленные нашими мастерами
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-zinc-950/95 backdrop-blur-sm border-y border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-3 sm:py-4 gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium whitespace-nowrap transition-all text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-black shadow-lg shadow-amber-900/50'
                    : 'bg-zinc-900 text-amber-500 hover:bg-amber-950/50 border border-amber-900/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500 mb-8 sm:mb-10 md:mb-12 text-center">
            {getCategoryTitle()}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-amber-400">Загрузка меню...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-zinc-950 border border-amber-900/20 rounded-2xl">
              <p className="text-amber-100/60">В этой категории пока нет блюд</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => {
                const isAdded = addedItems.has(item.id);
                const isAvailable = item.is_available;

                return (
                  <div
                    key={item.id}
                    className={`group bg-zinc-950 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 border border-amber-900/20 ${
                      !isAvailable ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900">
                      {imageErrors.has(item.id) ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                          <div className="text-center p-4">
                            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                            <p className="text-amber-100/60 text-sm">Изображение не найдено</p>
                            <p className="text-amber-100/40 text-xs mt-1">{item.image}</p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          onError={() => {
                            console.error('Failed to load image:', item.image);
                            setImageErrors(prev => new Set(prev).add(item.id));
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Нет в наличии
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        {item.price}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500 mb-3">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-amber-100/60 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {!isAvailable && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-red-400 text-xs">
                            Это блюдо временно недоступно для заказа
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded || !isAvailable}
                        className={`w-full py-2.5 sm:py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                          !isAvailable
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-gradient-to-r from-amber-600 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-400 shadow-lg shadow-amber-900/30'
                        }`}
                      >
                        {!isAvailable ? (
                          <>
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Недоступно
                          </>
                        ) : isAdded ? (
                          <>
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            Добавлено
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                            В корзину
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MenuNew;
