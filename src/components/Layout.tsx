import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-amber-900/20 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/">
              <img src="/SultanLOGO.png" alt="Sultan Restaurant" className="h-16 w-auto" />
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Главная</Link>
              <a href="/#about" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">О нас</a>
              <Link to="/menu" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Меню</Link>
              <a href="/#contact" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Контакты</a>
            </div>
            <a href="https://wa.me/996226500800" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-6 py-2.5 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold shadow-lg shadow-amber-900/50">
              Забронировать
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-amber-500 mb-4">Свяжитесь с нами</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mb-6"></div>
                <p className="text-lg text-amber-100/80">
                  Мы всегда рады вашим вопросам и предложениям. Забронируйте столик или закажите банкет.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1">Телефон</div>
                    <a href="tel:+1234567890" className="text-amber-100/70 hover:text-amber-400 transition-colors">
                      +996 226 50 08 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1">Email</div>
                    <a href="mailto:info@sultan-restaurant.ru" className="text-amber-100/70 hover:text-amber-400 transition-colors">
                      info@sultan-restaurant.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1">Адрес</div>
                    <p className="text-amber-100/70">
                      с.Уч-Коргон
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-zinc-950 rounded-xl hover:shadow-md hover:shadow-amber-900/30 transition-all border border-amber-900/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-400 mb-1">Часы работы</div>
                    <p className="text-amber-100/70">Пн-Вс: 12:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl shadow-xl shadow-amber-900/30 p-8 border border-amber-900/20">
              <h3 className="text-2xl font-bold text-amber-500 mb-6">Забронировать столик</h3>
              <div className="space-y-6">
                <p className="text-amber-100/80 text-lg leading-relaxed">
                  Для бронирования столика или получения дополнительной информации, пожалуйста, свяжитесь с нами через WhatsApp.
                </p>
                <a
                  href="https://wa.me/996226500800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black py-4 rounded-xl hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/70 text-center"
                >
                  Забронировать
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-amber-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/SultanLOGO.png" alt="Sultan Restaurant" className="h-16 w-auto mb-4" />
              <p className="text-amber-100/60">
                Изысканная кухня и безупречный сервис в сердце города
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-amber-500">Навигация</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-amber-100/60 hover:text-amber-400 transition-colors">Главная</Link>
                <a href="/#about" className="block text-amber-100/60 hover:text-amber-400 transition-colors">О нас</a>
                <Link to="/menu" className="block text-amber-100/60 hover:text-amber-400 transition-colors">Меню</Link>
                <a href="/#contact" className="block text-amber-100/60 hover:text-amber-400 transition-colors">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-amber-500">Контакты</h4>
              <div className="space-y-2 text-amber-100/60">
                <p>с.Уч-Коргон</p>
                <p>+996 226 50 08 00</p>
                <p>info@sultan-restaurant.ru</p>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-900/20 pt-8 text-center text-amber-100/60">
            <p>&copy; 2025 Sultan Restaurant. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
