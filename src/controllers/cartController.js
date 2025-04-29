// controllers/cartController.js
import Cart from '../moduls/Cart.js';
import CartItem from '../moduls/cartItem.js';
import MyTraining from '../moduls/MyTraining.js';
import TrainingItem from '../moduls/TrainingItem.js';

const getCart = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const cart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, as: 'cartItems' }]
        });

        if (!cart) {
            return res.status(404).send('Корзина не найдена');
        }

        res.json(cart.cartItems); // Отправляем только элементы корзины
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении корзины');
    }
};

const addItem = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const { serviceName, price } = req.body;

        // Находим или создаем корзину для пользователя
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Создаем новый элемент корзины
        await CartItem.create({
            cartId: cart.id,
            serviceName,
            price
        });

        res.status(201).send('Товар добавлен в корзину');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при добавлении товара в корзину');
    }
};

const removeItem = async (req, res) => {
    try {
        const { cartItemId } = req.body;

        // Удаляем элемент корзины
        await CartItem.destroy({ where: { id: cartItemId } });

        res.status(200).send('Товар удален из корзины');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при удалении товара из корзины');
    }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).send('Корзина не найдена');
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(200).send('Корзина очищена');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при очистке корзины');
  }
};

// controllers/cartController.js

// cartController.js
const addToTraining = async (req, res) => {
    try {
      const userId = req.session.user.id;
      const cart = req.body.cart;

      console.log('addToTraining: userId =', userId);
      console.log('addToTraining: cart =', cart);

      if (!cart || cart.length === 0) {
        return res.status(400).send('Корзина пуста');
      }

      // Получаем id корзины для текущего пользователя
      const cartRecord = await Cart.findOne({
        where: {
          userId: userId
        }
      });

      if (!cartRecord) {
        return res.status(400).send('Корзина не найдена');
      }

      const cartId = cartRecord.id;

      const myTraining = await MyTraining.create({
        userId: userId,
        trainingDate: new Date(),
      });

      for (const item of cart) {
        console.log('addToTraining: processing item =', item);
        console.log('addToTraining: serviceName =', item.serviceName);
        console.log('addToTraining: price =', item.price);
        await TrainingItem.create({
          myTrainingId: myTraining.id,
          serviceName: item.serviceName,
          price: item.price
        });
      }

      // Удаление товаров из корзины
      await CartItem.destroy({
        where: {
          cartId: cartId
        }
      });

      req.session.cart = [];

      res.status(201).send('Товары добавлены в Мои тренировки!');
    } catch (error) {
      console.error('Ошибка при добавлении в Мои тренировки:', error);
      res.status(500).send('Ошибка при добавлении в Мои тренировки');
    }
  };

  const getMyTrainings = async (req,res)=>{
    try{
        const userId = req.session.user.id;
        const trainings = await MyTraining.findAll({
            where:{userId},
            include: [{model: TrainingItem, as: 'trainingItems'}] // Оставляем только TrainingItem
        });
        res.json(trainings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении тренировок');
    }
}

export default { getCart, addItem, removeItem, clearCart, addToTraining, getMyTrainings };