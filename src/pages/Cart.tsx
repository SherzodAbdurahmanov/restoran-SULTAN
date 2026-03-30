import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <ShoppingCart className="w-20 h-20 sm:w-24 sm:h-24 text-amber-500/50 mx-auto mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500 mb-3 sm:mb-4">Корзина пуста</h1>
            <p className="text-base sm:text-lg text-amber-100/70 mb-6 sm:mb-8">Добавьте блюда из меню</p>
            <Link
              to="/menu"
              className="inline-block bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 font-semibold text-base sm:text-lg"
            >
              Перейти в меню
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-black">
      <section className="py-12 sm:py-16 md:py-20 bg-zinc-950 border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 sm:mb-6 text-center">
            Корзина
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto"></div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 rounded-2xl p-4 sm:p-6 border border-amber-900/20 hover:shadow-lg hover:shadow-amber-900/30 transition-all"
                >
                  <div className="flex gap-3 sm:gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500 pr-2">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-400 transition-colors p-1 sm:p-2 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      <p className="text-amber-100/60 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 bg-black rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-amber-900/20 w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-amber-500 hover:text-amber-400 transition-colors"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="text-amber-100 font-semibold text-base sm:text-lg w-6 sm:w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-amber-500 hover:text-amber-400 transition-colors"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-amber-500">
                          {(item.numericPrice * item.quantity).toFixed(0)} сом
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-amber-900/20 lg:sticky lg:top-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4 sm:mb-6">Итого</h2>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-amber-100/70 text-sm sm:text-base">
                    <span>Товаров:</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
                  </div>
                  <div className="border-t border-amber-900/20 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-semibold text-amber-400">Сумма:</span>
                      <span className="text-2xl sm:text-3xl font-bold text-amber-500">
                        {totalPrice.toFixed(0)} сом
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 font-semibold text-base sm:text-lg"
                >
                  Оформить заказ
                </button>
                <Link
                  to="/menu"
                  className="block w-full text-center text-amber-500 hover:text-amber-400 mt-3 sm:mt-4 transition-colors text-sm sm:text-base"
                >
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
