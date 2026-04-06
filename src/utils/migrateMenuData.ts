import { supabase } from '../lib/supabase';

export const menuCategories = {
  salads: {
    title: 'Салаты',
    items: [
      {
        name: 'Салат с языком',
        description: 'Деликатесный салат с отварным говяжьим языком, свежими овощами и майонезом',
        price: '220сом',
        image: '/salat-yazik.png',
        category: 'salads'
      },
      {
        name: 'Рафаэлло',
        description: 'Нежный салат с курицей, грибами, яйцом и сыром',
        price: '240сом',
        image: '/salat-rafaello.png',
        category: 'salads'
      },
      {
        name: 'Салат от Шефа',
        description: 'Авторский салат с телятиной, овощами гриль и фирменной заправкой',
        price: '250сом',
        image: '/salat-shef.png',
        category: 'salads'
      },
      {
        name: 'Салат Чимган',
        description: 'Айзберг, кур филе, язык, солённый огурец, сухари, соус чимган, сыр черчил',
        price: '220сом',
        image: '/salat-chimgan.png',
        category: 'salads'
      },
      {
        name: 'Салат Чабан',
        description: 'Огурцы очищенные, помидор, перец болгарский, петрушка, лук красный, масло оливки, лимонный сок, лимон',
        price: '180сом',
        image: '/salat-chaban.png',
        category: 'salads'
      },
      {
        name: 'Салат цезарь',
        description: 'Классический салат с курицей гриль, пармезаном и соусом Цезарь',
        price: '250сом',
        image: '/salat-cezar.png',
        category: 'salads'
      },
      {
        name: 'Салат греческий',
        description: 'Классический греческий салат с овощами, оливками и сыром фета',
        price: '220сом',
        image: '/salat-grek.png',
        category: 'salads'
      },
      {
        name: 'Соленья',
        description: 'Соленый помидор, огурцы, капуста, перец, стручковая фасоль, помидоры маринованные',
        price: '180сом',
        image: '/salat-sol.png',
        category: 'salads'
      },
      {
        name: 'Салат из баклажана',
        description: 'Баклажан, чеснок, помидор, соус терияки, шрирачи и рукола',
        price: '250сом',
        image: '/salat-baklajan.png',
        category: 'salads'
      },
      {
        name: 'Салат из руколлы',
        description: 'Свежая рукола с черри, пармезаном и бальзамическим соусом',
        price: '200сом',
        image: '/salat-rukolla.png',
        category: 'salads'
      },
      {
        name: 'Ассорти овощное',
        description: 'Свежие сезонные овощи, нарезанные и красиво оформленные',
        price: '260сом',
        image: '/salat-assorti.png',
        category: 'salads'
      },
      {
        name: 'Салат шакарап',
        description: 'Традиционный узбекский салат с помидорами, луком и зеленью',
        price: '120сом',
        image: '/salat-shakarap.png',
        category: 'salads'
      },
      {
        name: 'Салат свекольный',
        description: 'Салат со свеклой, грецкими орехами и чесночной заправкой',
        price: '130сом',
        image: '/salat-sveklo.png',
        category: 'salads'
      },
      {
        name: 'Китайский острый',
        description: 'Острый салат с овощами по-китайски и кунжутом',
        price: '250сом',
        image: '/salat-china.png',
        category: 'salads'
      }
    ]
  }
};

export async function migrateMenuToDatabase() {
  console.log('Starting menu migration...');

  const allItems = Object.entries(menuCategories).flatMap(([_, categoryData]) =>
    categoryData.items.map(item => ({
      ...item,
      is_available: true
    }))
  );

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(allItems)
      .select();

    if (error) {
      console.error('Migration error:', error);
      return { success: false, error };
    }

    console.log(`Successfully migrated ${data?.length || 0} items`);
    return { success: true, data };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error };
  }
}
