import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addItem);
router.post('/cart/remove', cartController.removeItem);
router.post('/cart/clear', cartController.clearCart);
router.get('/myTrainings', cartController.getMyTrainings);
router.post('/cart/addToTraining', cartController.addToTraining);





router.post('/remove', (req, res) => {
    const serviceName = req.body.serviceName;
  
    // Проверяем, есть ли корзина в сессии
    if (req.session.cart) {
      // Фильтруем товары, оставляя только те, у которых serviceName не совпадает с удаляемым
      req.session.cart = req.session.cart.filter(item => item.serviceName !== serviceName);
      console.log('Товар удален из корзины:', serviceName); // Логируем удаление
    } else {
      console.log('Корзина не найдена в сессии');
    }
  
    res.send('Товар удален из корзины');
  });




  router.post('/clear', (req, res) => {
    // Очищаем корзину, просто удаляя ее из сессии
    req.session.cart = [];
    console.log('Корзина очищена'); // Логируем очистку
    res.send('Корзина очищена');
  });



  router.post('/add', (req, res) => { // or /add
    const serviceName = req.body.serviceName;
    const price = req.body.price;
  
    // Проверяем, есть ли корзина в сессии
    if (!req.session.cart) {
      req.session.cart = []; // Создаем пустую корзину
    }
  
    // Добавляем товар в корзину
    req.session.cart.push({ serviceName: serviceName, price: price });
  
    console.log('Товар добавлен в корзину:', serviceName);
    res.send('Товар добавлен в корзину');
  });
  
export default router;