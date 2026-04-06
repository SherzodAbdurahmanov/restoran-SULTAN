import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Checkout() {
  const { items, totalPrice, clearCart, removeItem } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const validateItemsAvailability = async () => {
    try {
      const itemIds = items.map(item => item.id);
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, name, is_available')
        .in('id', itemIds);

      if (error) throw error;

      const unavailable = data?.filter(item => !item.is_available).map(item => item.name) || [];

      if (unavailable.length > 0) {
        setUnavailableItems(unavailable);

        unavailable.forEach(itemName => {
          const item = items.find(i => i.name === itemName);
          if (item) {
            removeItem(item.id);
          }
        });

        return false;
      }

      return true;
    } catch (err) {
      console.error('Error validating items:', err);
      setError('Ошибка проверки доступности блюд');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUnavailableItems([]);
    setIsSubmitting(true);

    const isValid = await validateItemsAvailability();

    if (!isValid) {
      setIsSubmitting(false);
      setError('Некоторые блюда из вашей корзины больше не доступны. Они были удалены из заказа.');
      return;
    }

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.numericPrice,
          total: item.numericPrice * item.quantity,
        })),
        total: totalPrice,
      };

      // Формируем сообщение для Telegram
      let message = `🍽 *Новый заказ!*\n\n`;
      message += `👤 *Имя:* ${orderData.name}\n`;
      message += `📞 *Телефон:* ${orderData.phone}\n`;
      message += `📍 *Адрес:* ${orderData.address}\n`;

      if (orderData.comment) {
        message += `💬 *Комментарий:* ${orderData.comment}\n`;
      }

      message += `\n📋 *Состав заказа:*\n`;

      orderData.items.forEach((item, index) => {
        message += `\n${index + 1}. ${item.name} x${item.quantity} — ${item.total} сом`;
      });

      message += `\n\n💰 *Итого: ${orderData.total} сом*`;

      // Отправляем в Telegram напрямую
      const TELEGRAM_BOT_TOKEN = '8414275953:AAFfT4IV7jFYm67Zd3isrzy_azegfDMlD88';
      const TELEGRAM_CHAT_ID = '5779574723';

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа');
      }

      setShowSuccess(true);
      clearCart();

      setTimeout(() => {
        navigate('/menu');
      }, 3000);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500 mb-3 sm:mb-4">Заказ успешно отправлен!</h1>
          <p className="text-base sm:text-lg text-amber-100/70 mb-6 sm:mb-8">
            Мы свяжемся с вами в ближайшее время для подтверждения
          </p>
          <div className="text-sm sm:text-base text-amber-100/60">Перенаправление в меню...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-black">
      <section className="py-12 sm:py-16 md:py-20 bg-zinc-950 border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-500 mb-4 sm:mb-6 text-center">
            Оформление заказа
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto"></div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-amber-900/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4 sm:mb-6">Ваш заказ</h2>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 sm:py-3 border-b border-amber-900/20"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="text-amber-100 font-medium text-sm sm:text-base truncate">{item.name}</div>
                      <div className="text-amber-100/60 text-xs sm:text-sm">x{item.quantity}</div>
                    </div>
                    <div className="text-amber-500 font-semibold text-sm sm:text-base flex-shrink-0">
                      {(item.numericPrice * item.quantity).toFixed(0)} сом
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-900/20 pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-semibold text-amber-400">Итого:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-500">
                    {totalPrice.toFixed(0)} сом
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-amber-900/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4 sm:mb-6">Контактные данные</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 text-sm mb-2">{error}</p>
                      {unavailableItems.length > 0 && (
                        <ul className="text-red-300 text-xs space-y-1">
                          {unavailableItems.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-amber-400 mb-2 font-medium text-sm sm:text-base">
                    Имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium text-sm sm:text-base">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium text-sm sm:text-base">
                    Адрес доставки <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                    placeholder="Укажите адрес доставки"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium text-sm sm:text-base">Комментарий</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors resize-none text-sm sm:text-base"
                    placeholder="Дополнительные пожелания к заказу"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Отправка...' : 'Оформить заказ'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
