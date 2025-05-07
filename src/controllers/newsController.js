
import News from '../moduls/News.js';


async function getNews(req, res) {
    console.log('getNews: Функция вызвана!');
    try {
      console.log('getNews: Начало получения новостей...'); // <<<--- ПРОВЕРЬТЕ ЭТО!
      const news = await News.findAll();
      console.log('getNews: Новостей получено из базы данных:', news); // <<<--- ПРОВЕРЬТЕ ЭТО!
  
      const data = {
        news: news
      };
  
      console.log('getNews: Данные, передаваемые в шаблон:', data); // <<<--- ПРОВЕРЬТЕ ЭТО!
      res.render('index', data);
    } catch (error) {
      console.error('getNews: Ошибка при получении новостей:', error);
      res.status(500).send('Ошибка сервера');
    }
  }

export { getNews };