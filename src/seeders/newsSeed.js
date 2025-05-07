import News from '../moduls/News.js';

const seedDatabaseNews = async () => {
  try {
    const newsCount = await News.count();
    if (newsCount === 0) {
      console.log('seedDatabaseNews: Начинаем заполнение новостями...');
      await News.bulkCreate([
        {
          image: '/img/news1.jpg',
          description: 'Говяжий бургер с толстым слоем чеддера и свежими помидорами, подается на мягкой булочке с кунжутом!',
        },
        
      ]);
      console.log('seedDatabaseNews: Новости успешно добавлены.');
    } else {
      console.log('seedDatabaseNews: Новости уже существуют, пропуск заполнения.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedDatabaseNews;