import { ChefHat, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const heroImages = [
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-bold text-amber-500 leading-tight">
                <span className="block">Добро пожаловать</span>
                <span className="block">в <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">SULTAN</span></span>
              </h1>
              <p className="text-xl text-amber-100 leading-relaxed">
                Изысканная кухня, роскошная атмосфера и безупречный сервис.
                Откройте для себя незабываемый кулинарный опыт в сердце города.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-8 py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/70 font-semibold text-lg">
                  Посмотреть меню
                </Link>
                <a href="https://wa.me/996226500800" target="_blank" rel="noopener noreferrer" className="bg-transparent text-amber-500 px-8 py-4 rounded-full hover:bg-amber-900/20 transition-all shadow-lg font-semibold text-lg border-2 border-amber-600">
                  Связаться с нами
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-yellow-500 rounded-3xl transform rotate-6 opacity-30"></div>
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/50">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Restaurant ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-950 border-y border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-amber-950/30 transition-all duration-300 group border border-amber-900/20">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-900/50">
                <ChefHat className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Мастер-шефы</h3>
              <p className="text-amber-100/80 leading-relaxed">
                Наши повара создают кулинарные шедевры из лучших ингредиентов
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-amber-950/30 transition-all duration-300 group border border-amber-900/20">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-900/50">
                <Utensils className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Авторская кухня</h3>
              <p className="text-amber-100/80 leading-relaxed">
                Уникальные блюда, сочетающие традиции и современные тренды
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-amber-950/30 transition-all duration-300 group border border-amber-900/20">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-900/50">
                <Utensils className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Халяльные продукты</h3>
              <p className="text-amber-100/80 leading-relaxed">
                Только сертифицированные халяльные ингредиенты высшего качества
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-amber-500">О ресторане</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500"></div>
              <p className="text-lg text-amber-100/80 leading-relaxed">
                SULTAN - это воплощение роскоши и изысканности. Мы создали пространство,
                где каждая деталь продумана до мелочей, чтобы подарить вам незабываемые впечатления.
              </p>
              <p className="text-lg text-amber-100/80 leading-relaxed">
                Наша философия - сочетание традиционных рецептов с современными кулинарными техниками.
                Каждое блюдо - это произведение искусства, созданное с любовью и вниманием к деталям.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">5+</div>
                  <div className="text-amber-200/70">Лет опыта</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">50+</div>
                  <div className="text-amber-200/70">Блюд в меню</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">10K+</div>
                  <div className="text-amber-200/70">Довольных гостей</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">5★</div>
                  <div className="text-amber-200/70">Рейтинг</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Restaurant Dish"
                className="rounded-2xl shadow-xl shadow-amber-900/50 h-64 w-full object-cover hover:scale-105 transition-transform duration-300 border border-amber-900/20"
              />
              <img
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Chef Cooking"
                className="rounded-2xl shadow-xl shadow-amber-900/50 h-64 w-full object-cover mt-8 hover:scale-105 transition-transform duration-300 border border-amber-900/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu-preview" className="py-20 bg-zinc-950 border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-amber-500 mb-4">Наше меню</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-amber-100/80 max-w-2xl mx-auto">
              Откройте для себя изысканные блюда, приготовленные из самых свежих ингредиентов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-black rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 border border-amber-900/20">
              <div className="relative overflow-hidden">
                <img
                  src="/priprava-dla-salata.jpg"
                  alt="Салаты"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-500 mb-4">Салаты</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-amber-100/80">
                    <span>Салат цезарь</span>
                    <span className="text-amber-400 font-semibold">250с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Салат с лососем</span>
                    <span className="text-amber-400 font-semibold">220с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Салат греческий</span>
                    <span className="text-amber-400 font-semibold">220с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Рафаэлло</span>
                    <span className="text-amber-400 font-semibold">200с</span>
                  </li>
                </ul>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-lg">от 120с</div>
              </div>
            </div>

            <div className="group bg-black rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 border border-amber-900/20">
              <div className="relative overflow-hidden">
                <img
                  src="/vid-gotovoi-vkusnoi-edy-na-hodu_(1).jpg"
                  alt="Вторые блюда"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-500 mb-4">Вторые блюда</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-amber-100/80">
                    <span>Султан</span>
                    <span className="text-amber-400 font-semibold">320с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Дапан Жи</span>
                    <span className="text-amber-400 font-semibold">420с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Бефстроганов</span>
                    <span className="text-amber-400 font-semibold">300с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Фетучини с курицей</span>
                    <span className="text-amber-400 font-semibold">280с</span>
                  </li>
                </ul>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-lg">от 280с</div>
              </div>
            </div>

            <div className="group bg-black rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 border border-amber-900/20">
              <div className="relative overflow-hidden">
                <img
                  src="/lomtik-cizkeika-s-malinovym-siropom-otstaviv-casku-agod_(1)_(1).jpg"
                  alt="Десерты"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-500 mb-4">Десерты</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-amber-100/80">
                    <span>Медовик</span>
                    <span className="text-amber-400 font-semibold">120с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Панчо</span>
                    <span className="text-amber-400 font-semibold">200с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Красный бархат</span>
                    <span className="text-amber-400 font-semibold">200с</span>
                  </li>
                  <li className="flex justify-between text-amber-100/80">
                    <span>Сникерс</span>
                    <span className="text-amber-400 font-semibold">200с</span>
                  </li>
                </ul>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-lg">от 120с</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-8 py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/70 font-semibold text-lg inline-block">
              Посмотреть полное меню
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
