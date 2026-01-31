import { useState } from 'react';

const menuCategories = {
  salads: {
    title: 'Салаты',
    items: [
      {
        name: 'Салат с языком',
        description: 'Деликатесный салат с отварным говяжьим языком, свежими овощами и майонезом',
        price: '220сом',
        image: '/salat-yazik.png'
      },
      {
        name: 'Рафаэлло',
        description: 'Нежный салат с курицей, грибами, яйцом и сыром',
        price: '240сом',
        image: '/salat-rafaello.png'
      },
      {
        name: 'Салат от Шефа',
        description: 'Авторский салат с телятиной, овощами гриль и фирменной заправкой',
        price: '250сом',
        image: '/salat-shef.png'
      },
      {
        name: 'Салат Чимган',
        description: 'Айзберг, кур филе, язык, солённый огурец, сухари, соус чимган, сыр черчил. ',
        price: '220сом',
        image: '/salat-chimgan.png'
      },
      {
        name: 'Салат Чабан',
        description: 'Огурцы очищенные, помидор, перец болгарский, петрушка,лук красный, масло оливки, лимонный сок, лимон.',
        price: '180сом',
        image: '/salat-chaban.png'
      },
       {
        name: 'Салат цезарь',
        description: 'Классический салат с курицей гриль, пармезаном и соусом Цезарь',
        price: '250сом',
        image: '/salat-cezar.png'
      },
      {
        name: 'Салат греческий',
        description: 'Классический греческий салат с овощами, оливками и сыром фета',
        price: '220сом',
        image: '/salat-grek.png'
      },
      {
        name: 'Соленья',
        description: 'Соленый помидор, огурцы, капуста, перец, стручковая фасоль,помидоры маринованные',
        price: '180сом',
        image: '/salat-sol.png'
      },
       {
        name: 'Салат из баклажана',
        description: 'Баклажан, чеснок, помидор, соус терияки, шрирачи и рукола',
        price: '250сом',
        image: '/salat-baklajan.png'
      },
      {
        name: 'Салат из руколлы',
        description: 'Свежая рукола с черри, пармезаном и бальзамическим соусом',
        price: '200сом',
        image: '/salat-rukolla.png'
      },
      {
        name: 'Ассорти овощное',
        description: 'Свежие сезонные овощи, нарезанные и красиво оформленные',
        price: '260сом',
        image: '/salat-assorti.png'
      },
      {
        name: 'Салат шакарап',
        description: 'Традиционный узбекский салат с помидорами, луком и зеленью',
        price: '120сом',
        image: '/salat-shakarap.png'
      },
      {
        name: 'Салат свекольный',
        description: 'Салат со свеклой, грецкими орехами и чесночной заправкой',
        price: '130сом',
        image: '/salat-sveklo.png'
      },
      {
        name: 'Китайский острый',
        description: 'Острый салат с овощами по-китайски и кунжутом',
        price: '250сом',
        image: '/salat-china.png'
      }
    ]
  },
  soups: {
    title: 'Первые блюда',
    items: [
      {
        name: 'Бодоно шорпо',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '380сом',
        image: '/bodono-shorpo.png'
      },
      {
        name: 'Чучбара по домашнему',
        description: 'Традиционный узбекский суп с пельменями и насыщенным бульоном',
        price: '200сом',
        image: '/chuchbara.png'
      },
      {
        name: 'Харчо по грузински',
        description: 'Пряный грузинский суп с говядиной, рисом и грецкими орехами',
        price: '200сом',
        image: '/xarcho.png'
      },
      {
        name: 'Шорпо из говядины',
        description: 'Наваристый суп с говядиной и свежими овощами',
        price: '240сом',
        image: '/shorpo-gov.png'
      },
       {
        name: 'Борщ',
        description: 'Классический украинский борщ с говядиной и сметаной',
        price: '200сом',
        image: '/borsh.png'
      },
      {
        name: 'Рамён',
        description: 'Куриное яйцо, чеснок, растительное масло, зеленый лук,куриное бедро, масло сливочное, лапша.',
        price: '250сом',
        image: '/ramyon.png'
      },
    ]
  },
  mainDishes: {
    title: 'Вторые блюда',
    items: [
      {
        name: 'Плов Ташкентский',
        description: 'Классический ташкентский плов с бараниной, морковью и специями',
        price: '270сом',
        image: '/plov-tashkent.png'
      },
      {
        name: 'Мозговой штурм',
        description: 'Плов по рецепту восточных чайхан с сочным мясом',
        price: '200сом',
        image: '/mozgovoy-shturm.png'
      },
      {
        name: 'Босо лагман (жареный)',
        description: 'Жареная лапша с мясом и овощами по-уйгурски',
        price: '290сом',
        image: '/boso-lagman.png'
      },
      {
        name: 'Гуйру лагман',
        description: 'Уйгурское блюдо - домашняя лапша с мясом и овощами в бульоне',
        price: '290сом',
        image: '/guyru-lagman.png'
      },
      {
        name: 'Султан',
        description: 'Фирменное блюдо ресторана - изысканное мясное ассорти',
        price: '650сом',
        image: '/sultan.png'
      },
      {
        name: 'Фрикассе из курицы',
        description: 'Нежная курица в сливочном соусе с овощами',
        price: '430сом',
        image: '/frikasse-kur.png'
      },
      {
        name: 'Ачуу эт',
        description: 'Традиционное киргизское блюдо - тушеное мясо с острым соусом',
        price: '520сом',
        image: '/achuu-et.png'
      },
      {
        name: 'Бифштекс особый',
        description: 'Сочный бифштекс из премиальной говядины с соусом',
        price: '240/370сом',
        image: '/bifshteks.png'
      },
      {
        name: 'Мясо с овощами',
        description: 'Обжаренное мясо с сезонными овощами',
        price: '410сом',
        image: '/meet-ovosh.png'
      },
            {
        name: 'Допанжи',
        description: 'Уйгурское блюдо - курица с картофелем и овощами на большой сковороде',
        price: '380сом',
        image: '/dopanji.png'
      },
        {
        name: 'Хинкал по грузински',
        description: 'Грузинские хинкали с мясным соком внутри',
        price: '350сом',
        image: '/hinkali.png'
      },
      {
        name: 'Манты',
        description: 'Паровые манты с сочной мясной начинкой',
        price: '280сом',
        image: '/manty.png'
      },
      {
        name: 'Долма по грузински',
        description: 'Виноградные листья с ароматной мясной начинкой',
        price: '300сом',
        image: '/dolma.png'
      },
      {
        name: 'Бефстроганов',
        description: 'Классический бефстроганов из нежной говядины со сметанным соусом',
        price: '430сом',
        image: '/befstroganov.png'
      },
      {
        name: 'Бон филе из говяжей вырезки',
        description: 'Итальянская паста с домашними фрикадельками',
        price: '520сом',
        image: '/bon-file.png'
      },
       {
        name: 'Медальон',
        description: 'Итальянская паста с домашними фрикадельками',
        price: '490сом',
        image: '/medalyon.png'
      },
       {
        name: 'Томлёная баранья рулька',
        description: 'Итальянская паста с домашними фрикадельками',
        price: '650сом',
        image: '/tomlyonnaya.png'
      },
       {
        name: 'Куриное филе в сливочном соусе',
        description: 'Итальянская паста с домашними фрикадельками',
        price: '450сом',
        image: '/file-sous.png'
      },
      {
        name: 'Фетучини с курицей',
        description: 'Паста фетучини с курицей в сливочном соусе',
        price: '410сом',
        image: '/fetuchini-kur.png'
      },
      {
        name: 'Куурдак с картошкой',
        description: 'Традиционное киргизское блюдо - жареное мясо с картофелем',
        price: '530сом',
        image: '/kuurdan-kot.png'
      },
      {
        name: 'Жаровня из курицы',
        description: 'Ароматная курица с овощами в традиционной жаровне',
        price: '320сом',
        image: '/jar-kur.png'
      },
      {
        name: 'Жаровня из говядины / особая',
        description: 'Говядина с овощами и специями в жаровне - фирменный рецепт',
        price: '440/400сом',
        image: '/jar-gov.png'
      },
      {
        name: 'Самса в тандыре',
        description: 'Премиальный мраморный стейк с насыщенным вкусом',
        price: '100сом',
        image: '/samsa.png'
      },
    ]
  },
  meet: {
    title: 'Мясо из казана',
    items: [
      {
        name: 'Мясной сет 6-10',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '4500/6000сом',
        image: '/meet-set-10.png'
      },
      {
        name: 'Мясной сет 4-5',
        description: 'Традиционный узбекский суп с пельменями и насыщенным бульоном',
        price: '3000сом',
        image: '/meet-set-5.png'
      },
      {
        name: 'Мясной сет 2-3',
        description: 'Пряный грузинский суп с говядиной, рисом и грецкими орехами',
        price: '1750сом',
        image: '/meet-set-3.png'
      },
    ]
  },
  steaks: {
    title: 'Стейки',
    items: [
      {
        name: 'Т-Бон стейк',
        description: 'Легендарный стейк на кости с филе-миньоном и стриплойном',
        price: '900сом',
        image: '/tbon-steyk.png'
      },
      {
        name: 'Томогавк',
        description: 'Впечатляющий рибай на длинной кости, идеален для компании',
        price: '950сом',
        image: '/tomogavk.png'
      },
      {
        name: 'Стейк рибай',
        description: 'Премиальный мраморный стейк с насыщенным вкусом',
        price: '1200сом',
        image: '/ribay-steyk.png'
      },
      {
        name: 'Стейк из семги',
        description: 'Сочный стейк из норвежской семги, приготовленный на гриле',
        price: '950сом',
        image: '/semga-steyk.png'
      },
      {
        name: 'Корейка ягнёнка на мангале',
        description: 'Премиальный мраморный стейк с насыщенным вкусом',
        price: '650сом',
        image: '/koreyka-mangal.png'
      },
    ]
  },
  fastfood: {
    title: 'Фаст Фуд',
    items: [
      {
        name: 'Шаурма куриный',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '240сом',
        image: '/shaurma-kur.png'
      },
      {
        name: 'Шаурма говядина',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '260сом',
        image: '/shaurma-gov.png'
      },
      {
        name: 'Гамбургер с говядиной',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '250сом',
        image: '/gam-gov.png'
      },
      {
        name: 'Чикен бургер',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '230сом',
        image: '/gam-chiken.png'
      },
      {
        name: 'Чизбургер',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '250сом',
        image: '/chizburger.png'
      },
      {
        name: 'Картофель фри с сыром',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '100сом',
        image: '/fri.png'
      },
      {
        name: 'Картофельные дольки с сыром',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '100сом',
        image: '/fri-dolki.png'
      },
      {
        name: 'Картофельные шарики c сыром ',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '100сом',
        image: '/fri-sharik.png'
      },
      {
        name: 'Соусы',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '50сом',
        image: '/sous.png'
      },
    ]
  },
  shashlyk: {
    title: 'Шашлыки',
    items: [
      {
        name: 'Шашлыки',
        description: 'Освежающий лимонад с голубым кюрасао',
        image: '/shashlyk.png'
      }
    ]
  },
  custom: {
    title: 'Блюда на заказ',
    items: [
      {
        name: 'Пирожок',
        description: 'Традиционные пирожки с мясом или овощами, свежая выпечка',
        price: '2000сом/1кг',
        image: '/pirojok.png'
      },
      {
        name: 'Плов чайханский',
        description: 'Классический узбекский плов с бараниной по старинному рецепту',
        price: '2600сом/1кг',
        image: '/plov-chay.png'
      },
    ]
  },

  pizza: {
    title: 'Пиццы',
    items: [
      {
        name: 'Пицца Султан',
        description: 'Фирменная пицца с авторской начинкой',
        price: '590сом',
        image: '/pizza-sultan.png'
      },
      {
        name: 'Пицца ассорти',
        description: 'Разнообразие мясных деликатесов и овощей',
        price: '500сом',
        image: '/pizza-assorti.png'
      },
      {
        name: 'Пицца пепперони',
        description: 'Острая пепперони с моцареллой',
        price: '450сом',
        image: '/pizza-peperoni.png'
      },
      {
        name: 'Пицца маргарита',
        description: 'Томаты, моцарелла, базилик',
        price: '400сом',
        image: '/pizza-margarita.png'
      },
      {
        name: 'Пицца деревенская',
        description: 'С ветчиной, грибами и деревенским сыром',
        price: '550сом',
        image: '/pizza-derev.png'
      },
      {
        name: 'Пицца куриная',
        description: 'Курица, грибы, сыр, соус',
        price: '450сом',
        image: '/pizza-kur.png'
      },
      {
        name: 'Хачапури по аджарски',
        description: 'Традиционная грузинская лепёшка с сыром и яйцом',
        price: '300сом',
        image: '/xachipuri-ad.png'
      },
      {
        name: 'Хачапури по мергельски',
        description: 'Закрытая лепёшка с сыром',
        price: '300сом',
        image: '/xachipuri-mergel.png'
      },
      {
        name: 'Боорсок с каймаком',
        description: 'Традиционные жареные пончики с густой сметаной',
        price: '200сом',
        image: '/boorsoq.png'
      },
      {
        name: 'Кутабы с мясом',
        description: 'Азербайджанские лепёшки с мясной начинкой',
        price: '150сом/1шт',
        image: '/kutabi-meet.png'
      },
      {
        name: 'Кутабы с сыром',
        description: 'Тонкие лепёшки с сырной начинкой',
        price: '150сом/1шт',
        image: '/kutabi-sir.png'
      },
      {
        name: 'Кутабы с зеленью',
        description: 'Начинка из свежей зелени и специй',
        price: '140сом/1шт',
        image: '/kutabi-zelen.png'
      },
      {
        name: 'Домашние лепёшки',
        description: 'Свежие лепёшки из тандыра',
        price: '30сом',
        image: '/bread.png'
      }
    ]
  },
    rolls: {
    title: 'Роллы',
    items: [
      {
        name: 'Роллы',
        description: 'Свежие фрукты с нежным кремом',
        image: '/rolls.png'
      }
    ]
  },
  desserts: {
    title: 'Десерты',
    items: [
      {
        name: 'Десерты',
        description: 'Свежие фрукты с нежным кремом',
        image: '/dessert.png'
      }
    ]
  },
  vafli: {
    title: 'Венские вафли',
    items: [
      {
        name: 'Венские вафли',
        description: 'Классический черный чай',
        image: '/vafli.png'
      }
    ]
  },
  lemonade: {
    title: 'Лимонады',
    items: [
      {
        name: 'Лимонады',
        description: 'Освежающий лимонад с голубым кюрасао',
        image: '/limonad.png'
      }
    ]
  },
  iceCream: {
    title: 'Мороженое',
    items: [
      {
        name: 'Мороженое фруктовый',
        description: 'Фруктовое мороженое с натуральными фруктами',
        price: '150сом',
        image: '/ice-frukt.png'
      },
      {
        name: 'Ванильное',
        description: 'Классическое ванильное мороженое',
        price: '50сом',
        image: '/ice-vanil.png'
      },
      {
        name: 'Ванильное 2',
        description: 'Двойная порция ванильного мороженого',
        price: '150сом',
        image: 'ice-vanil2.png'
      },
      {
        name: 'С печеньем',
        description: 'Мороженое с хрустящим печеньем',
        price: '50сом',
        image: '/ice-pechen.png'
      },
      {
        name: 'Мороженое шоколадный',
        description: 'Шоколадное мороженое',
        price: '150сом',
        image: '/ice-choko.png'
      },
      {
        name: 'Мороженое шоколадный 2',
        description: 'Двойная порция шоколадного мороженого',
        price: '50сом',
        image: '/ice-choko2.png'
      }
    ]
  }
};

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('salads');

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
    { id: 'lemonade', label: 'Лимонады' }
  ];

  const currentCategory = menuCategories[selectedCategory as keyof typeof menuCategories];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zinc-950 border-b border-amber-900/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-amber-500 mb-6">
              Наше меню
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-amber-100/80 max-w-2xl mx-auto">
              Изысканные блюда восточной и европейской кухни из свежих халяльных продуктов
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-20 z-40 bg-black/95 backdrop-blur-sm border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
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

      {/* Menu Items */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-500 mb-12 text-center">
            {currentCategory.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCategory.items.map((item, index) => (
              <div
                key={index}
                className="group bg-zinc-950 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 border border-amber-900/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    {item.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-500">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-zinc-950 border-t border-amber-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-amber-500 mb-6">
            Готовы сделать заказ?
          </h2>
          <p className="text-xl text-amber-100/80 mb-8">
            Забронируйте столик или закажите доставку прямо сейчас
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/996226500800"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-8 py-4 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/70 font-semibold text-lg"
            >
              Связаться с нами
            </a>
            <a
              href="https://wa.me/996226500800"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-amber-500 px-8 py-4 rounded-full hover:bg-amber-900/20 transition-all shadow-lg font-semibold text-lg border-2 border-amber-600"
            >
              Забронировать столик
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
