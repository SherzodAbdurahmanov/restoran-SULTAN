import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(orderData),
        }
      );

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
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-amber-500 mb-4">Заказ успешно отправлен!</h1>
          <p className="text-amber-100/70 mb-8">
            Мы свяжемся с вами в ближайшее время для подтверждения
          </p>
          <div className="text-amber-100/60">Перенаправление в меню...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-black">
      <section className="py-20 bg-zinc-950 border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-7xl font-bold text-amber-500 mb-6 text-center">
            Оформление заказа
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-zinc-950 rounded-2xl p-8 border border-amber-900/20">
              <h2 className="text-3xl font-bold text-amber-500 mb-6">Ваш заказ</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-amber-900/20"
                  >
                    <div>
                      <div className="text-amber-100 font-medium">{item.name}</div>
                      <div className="text-amber-100/60 text-sm">x{item.quantity}</div>
                    </div>
                    <div className="text-amber-500 font-semibold">
                      {(item.numericPrice * item.quantity).toFixed(0)} сом
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-900/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-amber-400">Итого:</span>
                  <span className="text-3xl font-bold text-amber-500">
                    {totalPrice.toFixed(0)} сом
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl p-8 border border-amber-900/20">
              <h2 className="text-3xl font-bold text-amber-500 mb-6">Контактные данные</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-amber-400 mb-2 font-medium">
                    Имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium">
                    Адрес доставки <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Укажите адрес доставки"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 mb-2 font-medium">Комментарий</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="w-full bg-black border border-amber-900/20 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    placeholder="Дополнительные пожелания к заказу"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-8 py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
