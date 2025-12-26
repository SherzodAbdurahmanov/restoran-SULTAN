import { useState } from 'react';

const menuCategories = {
  salads: {
    title: 'Салаты',
    items: [
      {
        name: 'Салат с языком',
        description: 'Деликатесный салат с отварным говяжьим языком, свежими овощами и майонезом',
        price: '190сом',
        image: '/salat_yazyk.png'
      },
      {
        name: 'Рафаэлло',
        description: 'Нежный салат с курицей, грибами, яйцом и сыром',
        price: '200сом',
        image: '/salat_rafaello.png'
      },
      {
        name: 'Салат рубин',
        description: 'Изысканный салат со свеклой, грецкими орехами и черносливом',
        price: '240сом',
        image: '/salat_rubin.png'
      },
      {
        name: 'Салат от Шефа',
        description: 'Авторский салат с телятиной, овощами гриль и фирменной заправкой',
        price: '240сом',
        image: '/salat_otshefa.png'
      },
      {
        name: 'Салат из руколлы',
        description: 'Свежая рукола с черри, пармезаном и бальзамическим соусом',
        price: '385сом',
        image: '/salat_rukolla.png'
      },
      {
        name: 'Салат шакарап',
        description: 'Традиционный узбекский салат с помидорами, луком и зеленью',
        price: '120сом',
        image: '/salat_shakarap.png'
      },
      {
        name: 'Сырная тарелка',
        description: 'Ассорти благородных сыров с виноградом и орехами',
        price: '550сом',
        image: '/salat_tarelka.png'
      },
      {
        name: 'Салат цезарь',
        description: 'Классический салат с курицей гриль, пармезаном и соусом Цезарь',
        price: '250сом',
        image: '/salat_cezar.png'
      },
      {
        name: 'Салат лёгкий',
        description: 'Свежие овощи с зеленью и лимонной заправкой',
        price: '250сом',
        image: '/salat_lyogkiy.png'
      },
      {
        name: 'Салат из баклажана',
        description: 'Запеченные баклажаны с томатами, чесноком и зеленью',
        price: '250сом',
        image: '/salat_baklajan.png'
      },
      {
        name: 'Ассорти овощное',
        description: 'Свежие сезонные овощи, нарезанные и красиво оформленные',
        price: '230сом',
        image: '/salat_ovosh.png'
      },
      {
        name: 'Салат с лососем',
        description: 'Слабосоленый лосось с авокадо, огурцом и кунжутом',
        price: '220сом',
        image: '/salat_losos.png'
      },
      {
        name: 'Салат греческий',
        description: 'Классический греческий салат с овощами, оливками и сыром фета',
        price: '220сом',
        image: '/salat_grecheskiy.png'
      },
      {
        name: 'Салат свекольный',
        description: 'Салат со свеклой, грецкими орехами и чесночной заправкой',
        price: '120сом',
        image: '/salat_svekolniy.png'
      },
      {
        name: 'Китайский острый',
        description: 'Острый салат с овощами по-китайски и кунжутом',
        price: '200сом',
        image: '/salat_china.png'
      }
    ]
  },
  soups: {
    title: 'Первые блюда',
    items: [
      {
        name: 'Чучбара по домашнему',
        description: 'Традиционный узбекский суп с пельменями и насыщенным бульоном',
        price: '180сом',
        image: '/chuchbara.png'
      },
      {
        name: 'Харчо по грузински',
        description: 'Пряный грузинский суп с говядиной, рисом и грецкими орехами',
        price: '180сом',
        image: '/harcho.png'
      },
      {
        name: 'Шорпо из говядины',
        description: 'Наваристый суп с говядиной и свежими овощами',
        price: '220сом',
        image: '/shorpo.png'
      },
      {
        name: 'Бодоно шорпо',
        description: 'Киргизский суп из перепелок с овощами и специями',
        price: '350сом',
        image: '/bodono.png'
      },
      {
        name: 'Мясо по казахски',
        description: 'Традиционное казахское блюдо - бешбармак с мясом и лапшой в бульоне',
        price: '250сом',
        image: '/kazah.png'
      },
      {
        name: 'Борщ',
        description: 'Классический украинский борщ с говядиной и сметаной',
        price: '180сом',
        image: '/borsh.png'
      },
      {
        name: 'Мампар',
        description: 'Узбекский суп с нежными кусочками теста, мясом и овощами',
        price: '200сом',
        image: '/mampar.png'
      },
      {
        name: 'Домашние пельмени',
        description: 'Пельмени ручной лепки с мясной начинкой в бульоне',
        price: '200сом',
        image: '/pelmen.png'
      }
    ]
  },
  mainDishes: {
    title: 'Вторые блюда',
    items: [
      {
        name: 'Плов Ташкентский',
        description: 'Классический ташкентский плов с бараниной, морковью и специями',
        price: '250сом',
        image: '/plov.png'
      },
      {
        name: 'Плов чайханский',
        description: 'Плов по рецепту восточных чайхан с сочным мясом',
        price: '290сом',
        image: '/plov_chayhana.png'
      },
      {
        name: 'Гуйру лагман (жидкий)',
        description: 'Уйгурское блюдо - домашняя лапша с мясом и овощами в бульоне',
        price: '260сом',
        image: '/guyru_lagman.png'
      },
      {
        name: 'Босо лагман (жареный)',
        description: 'Жареная лапша с мясом и овощами по-уйгурски',
        price: '280сом',
        image: '/boso_lagman.png'
      },
      {
        name: 'Гуйру лагман',
        description: 'Традиционный уйгурский лагман с тянутой лапшой',
        price: '280сом',
        image: '/guyru_lagman2.png'
      },
      {
        name: 'Фрикассе из курицы',
        description: 'Нежная курица в сливочном соусе с овощами',
        price: '400сом',
        image: '/frikasse.png'
      },
      {
        name: 'Ачуу эт',
        description: 'Традиционное киргизское блюдо - тушеное мясо с острым соусом',
        price: '490сом',
        image: '/achu_et.png'
      },
      {
        name: 'Султан',
        description: 'Фирменное блюдо ресторана - изысканное мясное ассорти',
        price: '590сом',
        image: '/sultan.png'
      },
      {
        name: 'Бифштекс особый',
        description: 'Сочный бифштекс из премиальной говядины с соусом',
        price: '220сом',
        image: '/bifshteks.png'
      },
      {
        name: 'Манты',
        description: 'Паровые манты с сочной мясной начинкой',
        price: '250сом',
        image: '/manty.png'
      },
      {
        name: 'Мясо с овощами',
        description: 'Обжаренное мясо с сезонными овощами',
        price: '390сом',
        image: '/myaso.png'
      },
      {
        name: 'Хинкал по грузински',
        description: 'Грузинские хинкали с мясным соком внутри',
        price: '300сом',
        image: '/hinkal.png'
      },
      {
        name: 'Долма по грузински',
        description: 'Виноградные листья с ароматной мясной начинкой',
        price: '300сом',
        image: '/dolma.png'
      },
      {
        name: 'Паста с фрикадельками в томатном соусе',
        description: 'Итальянская паста с домашними фрикадельками',
        price: '350сом',
        image: '/pasta.png'
      },
      {
        name: 'Курица по-царски',
        description: 'Куриное филе под сливочно-грибным соусом',
        price: '400сом',
        image: '/kurica_car.png'
      },
      {
        name: 'Корейка баранина на мангале',
        description: 'Сочная баранья корейка, приготовленная на углях',
        price: '180сом/100гр',
        image: '/koreyka.png'
      },
      {
        name: 'Дапан Жи',
        description: 'Уйгурское блюдо - курица с картофелем и овощами на большой сковороде',
        price: '380сом',
        image: '/dapanji.png'
      },
      {
        name: 'Бефстроганов',
        description: 'Классический бефстроганов из нежной говядины со сметанным соусом',
        price: '400сом',
        image: '/befsroganov.png'
      },
      {
        name: 'Куурдак с картошкой',
        description: 'Традиционное киргизское блюдо - жареное мясо с картофелем',
        price: '490сом',
        image: '/kuurdaq.png'
      },
      {
        name: 'Фетучини с курицей',
        description: 'Паста фетучини с курицей в сливочном соусе',
        price: '380сом',
        image: '/fetuchini.png'
      },
      {
        name: 'Жаровня из курицы',
        description: 'Ароматная курица с овощами в традиционной жаровне',
        price: '360сом',
        image: '/jarovnya_kur.png'
      },
      {
        name: 'Жаровня из говядины / особая',
        description: 'Говядина с овощами и специями в жаровне - фирменный рецепт',
        price: '440/480сом',
        image: '/jarovnya_gov.png'
      }
    ]
  },
  steaks: {
    title: 'Стейки',
    items: [
      {
        name: 'Т-Бон стейк',
        description: 'Легендарный стейк на кости с филе-миньоном и стриплойном',
        price: '850сом',
        image: '/steyk_tbon.png'
      },
      {
        name: 'Томогавк',
        description: 'Впечатляющий рибай на длинной кости, идеален для компании',
        price: '850сом',
        image: '/steyk_tomogavk.png'
      },
      {
        name: 'Стейк рибай',
        description: 'Премиальный мраморный стейк с насыщенным вкусом',
        price: '950сом',
        image: '/steyk_ribay.png'
      },
      {
        name: 'Стейк из семги',
        description: 'Сочный стейк из норвежской семги, приготовленный на гриле',
        price: '850сом',
        image: '/steyk_semga.png'
      }
    ]
  },
  custom: {
    title: 'Блюда на заказ',
    items: [
      {
        name: 'Пирожок',
        description: 'Традиционные пирожки с мясом или овощами, свежая выпечка',
        price: '1900сом/1кг',
        image: '/zakaz_pirojok.png'
      },
      {
        name: 'Плов чайханский',
        description: 'Классический узбекский плов с бараниной по старинному рецепту',
        price: '1500сом/0,5кг 2400сом/1кг',
        image: '/zakaz_plov.png'
      },
      {
        name: 'Мясо в тандыре',
        description: 'Сочное мясо, приготовленное в традиционной печи-тандыре',
        price: '1800сом/1кг',
        image: '/zakaz_myaso.png'
      }
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
        image: '/hachapuri.png'
      },
      {
        name: 'Хачапури по мергельски',
        description: 'Закрытая лепёшка с сыром',
        price: '300сом',
        image: '/pizza-megrel.png'
      },
      {
        name: 'Боорсок с каймаком',
        description: 'Традиционные жареные пончики с густой сметаной',
        price: '150сом',
        image: '/boorsoq.png'
      },
      {
        name: 'Кутабы с мясом',
        description: 'Азербайджанские лепёшки с мясной начинкой',
        price: '130сом/1шт',
        image: '/kutabi-myaso.png'
      },
      {
        name: 'Кутабы с сыром',
        description: 'Тонкие лепёшки с сырной начинкой',
        price: '130сом/1шт',
        image: '/kutabi-sir.png'
      },
      {
        name: 'Кутабы с зеленью',
        description: 'Начинка из свежей зелени и специй',
        price: '120сом/1шт',
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
  desserts: {
    title: 'Десерты',
    items: [
      {
        name: 'Фруктовый десерт',
        description: 'Свежие фрукты с нежным кремом',
        price: '120сом',
        image: '/dessert-frukto.png'
      },
      {
        name: 'Медовик',
        description: 'Классический торт со сметанным кремом',
        price: '120сом',
        image: '/dessert-medovik.png'
      },
      {
        name: 'Меринговый',
        description: 'Воздушный десерт с безе и кремом',
        price: '120сом',
        image: '/dessert-merin.png'
      },
      {
        name: 'Панчо',
        description: 'Шоколадный десерт с ананасами',
        price: '200сом',
        image: '/dessert-pancho.png'
      },
      {
        name: 'Сникерс',
        description: 'Торт с карамелью, арахисом и шоколадом',
        price: '200сом',
        image: '/dessert-snikers.png'
      },
      {
        name: 'Евро десерт',
        description: 'Изысканный слоёный торт',
        price: '225сом',
        image: '/dessert-evro.png'
      },
      {
        name: 'Евро десерт 2',
        description: 'Нежный бисквитный торт с кремом',
        price: '225сом',
        image: '/dessert-evro2.png'
      },
      {
        name: 'Красный бархат',
        description: 'Классический торт с сырным кремом',
        price: '200сом',
        image: '/dessert-barhat.png'
      },
      {
        name: 'Чоко бум',
        description: 'Насыщенный шоколадный торт',
        price: '200сом',
        image: '/dessert-choko.png'
      }
    ]
  },
  tea: {
    title: 'Фирменные чаи',
    items: [
      {
        name: 'Чай чёрный',
        description: 'Классический черный чай',
        price: '20сом',
        image: '/tea-black.png'
      },
      {
        name: 'Чай зелёный',
        description: 'Освежающий зеленый чай',
        price: '20сом',
        image: '/tea-green.png'
      },
      {
        name: 'Чай мята с мёдом',
        description: 'Ароматный мятный чай с натуральным медом',
        price: '150сом',
        image: '/tea-myod.png'
      },
      {
        name: 'Чай имбирный с лимоном',
        description: 'Согревающий имбирный чай с лимоном',
        price: '150сом',
        image: '/tea-limon.png'
      },
      {
        name: 'Чай фруктовый',
        description: 'Ароматный чай с фруктами',
        price: '180сом',
        image: '/tea-fruktoviy.png'
      },
      {
        name: 'Чай наглый фрукт',
        description: 'Яркий фруктовый микс',
        price: '200сом',
        image: '/tea-frukt.png'
      },
      {
        name: 'Чай с облепихой',
        description: 'Витаминный чай с облепихой и медом',
        price: '200сом',
        image: '/tea-oblep.png'
      }
    ]
  },
  lemonade: {
    title: 'Лимонады',
    items: [
      {
        name: 'Лимонад голубая лагуна',
        description: 'Освежающий лимонад с голубым кюрасао',
        price: '0.3л/130сом 1л/300сом',
        image: '/limonad-laguna.png'
      },
      {
        name: 'Лимонад клубника маракуйя',
        description: 'Экзотический микс клубники и маракуйи',
        price: '300сом',
        image: '/limonad-klubnika.png'
      },
      {
        name: 'Лимонад маракуйя',
        description: 'Тропический лимонад с маракуйей',
        price: '350сом',
        image: '/limonad-marakuya.png'
      },
      {
        name: 'Мохито клубника',
        description: 'Клубничный мохито с мятой',
        price: '0.3л/130сом 1л/300сом',
        image: '/mohito-klubnika.png'
      },
      {
        name: 'Милкшейк клубничный',
        description: 'Нежный клубничный милкшейк',
        price: '0.3л/150сом',
        image: '/milk-klubnika.png'
      },
      {
        name: 'Милкшейк ванильный',
        description: 'Классический ванильный милкшейк',
        price: '0.3л/150сом',
        image: '/milk-vanil.png'
      },
      {
        name: 'Тархун',
        description: 'Освежающий напиток с эстрагоном',
        price: '0.3л/130сом 1л/300сом',
        image: '/limonad-tarhun.png'
      },
      {
        name: 'Мохито',
        description: 'Освежающий мохито с лаймом',
        price: '0.3л/130сом 1л/300сом',
        image: '/mohito.png'
      },
      {
        name: 'Мохито классический',
        description: 'Классический рецепт мохито',
        price: '0.3л/130сом 1л/300сом',
        image: '/mohito-klassik.png'
      },
      {
        name: 'Компот малиновый',
        description: 'Домашний компот из малины',
        price: '150сом',
        image: '/kompot-malina.png'
      },
      {
        name: 'Компот домашний',
        description: 'Традиционный домашний компот',
        price: '150сом',
        image: '/kompot-doma.png'
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
    { id: 'steaks', label: 'Стейки' },
    { id: 'custom', label: 'Блюда на заказ' },
    { id: 'pizza', label: 'Пиццы' },
    { id: 'desserts', label: 'Десерты' },
    { id: 'tea', label: 'Фирменные чаи' },
    { id: 'lemonade', label: 'Лимонады' },
    { id: 'iceCream', label: 'Мороженое' }
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
