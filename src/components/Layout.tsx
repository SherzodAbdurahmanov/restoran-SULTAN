import { Phone, MapPin, Clock, Mail, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-amber-900/20 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/">
              <img src="/SultanLOGO.png" alt="Sultan Restaurant" className="h-12 sm:h-16 w-auto" />
            </Link>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link to="/" className="text-amber-500 hover:text-amber-400 transition-colors font-medium text-sm lg:text-base">Главная</Link>
              <a href="/#about" className="text-amber-500 hover:text-amber-400 transition-colors font-medium text-sm lg:text-base">О нас</a>
              <Link to="/menu" className="text-amber-500 hover:text-amber-400 transition-colors font-medium text-sm lg:text-base">Меню</Link>
              <a href="/#contact" className="text-amber-500 hover:text-amber-400 transition-colors font-medium text-sm lg:text-base">Контакты</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/cart"
                className="relative text-amber-500 hover:text-amber-400 transition-colors p-2"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <a href="https://wa.me/996226500800" target="_blank" rel="noopener noreferrer" className="hidden sm:block bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold shadow-lg shadow-amber-900/50 text-sm lg:text-base">
                Забронировать
              </a>
              <a href="https://wa.me/996226500800" target="_blank" rel="noopener noreferrer" className="sm:hidden bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-3 py-2 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold shadow-lg shadow-amber-900/50 text-xs">
                Заказать
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-black border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-500 mb-3 sm:mb-4">Свяжитесь с нами</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg text-amber-100/80">
                  Мы всегда рады вашим вопросам и предложениям. Забронируйте столик или закажите банкет.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1 text-sm sm:text-base">Телефон</div>
                    <a href="tel:+1234567890" className="text-amber-100/70 hover:text-amber-400 transition-colors text-sm sm:text-base">
                      +996 226 50 08 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-amber-400 mb-1 text-sm sm:text-base">Email</div>
                    <a href="mailto:info@sultan-restaurant.ru" className="text-amber-100/70 hover:text-amber-400 transition-colors text-sm sm:text-base break-all">
                      info@sultan-restaurant.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1 text-sm sm:text-base">Адрес</div>
                    <p className="text-amber-100/70 text-sm sm:text-base">
                      с.Уч-Коргон
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1 text-sm sm:text-base">Часы работы</div>
                    <p className="text-amber-100/70 text-sm sm:text-base">Пн-Вс: 12:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl shadow-xl shadow-amber-900/30 p-6 sm:p-8 border border-amber-900/20 mt-8 md:mt-0">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 sm:mb-6">Забронировать столик</h3>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-amber-100/80 text-base sm:text-lg leading-relaxed">
                  Для бронирования столика или получения дополнительной информации, пожалуйста, свяжитесь с нами через WhatsApp.
                </p>
                <a
                  href="https://wa.me/996226500800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black py-3 sm:py-4 rounded-xl hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/70 text-center text-base sm:text-lg"
                >
                  Забронировать
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-amber-900/20 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <img src="/SultanLOGO.png" alt="Sultan Restaurant" className="h-12 sm:h-16 w-auto mb-3 sm:mb-4" />
              <p className="text-amber-100/60 text-sm sm:text-base">
                Изысканная кухня и безупречный сервис в сердце города
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-amber-500">Навигация</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-amber-100/60 hover:text-amber-400 transition-colors text-sm sm:text-base">Главная</Link>
                <a href="/#about" className="block text-amber-100/60 hover:text-amber-400 transition-colors text-sm sm:text-base">О нас</a>
                <Link to="/menu" className="block text-amber-100/60 hover:text-amber-400 transition-colors text-sm sm:text-base">Меню</Link>
                <a href="/#contact" className="block text-amber-100/60 hover:text-amber-400 transition-colors text-sm sm:text-base">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-amber-500">Контакты</h4>
              <div className="space-y-2 text-amber-100/60 text-sm sm:text-base">
                <p>с.Уч-Коргон</p>
                <p>+996 226 50 08 00</p>
                <p className="break-all">info@sultan-restaurant.ru</p>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-900/20 pt-6 sm:pt-8 text-center text-amber-100/60 text-sm sm:text-base">
            <p>&copy; 2025 Sultan Restaurant. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
