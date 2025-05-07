
import { loginUser } from '../services/login.js'; 

const loginController = async (req, res) => {
    try {
      const { login, password } = req.body;
  
      // **ХАРДКОДНАЯ ПРОВЕРКА ДЛЯ МЕНЕДЖЕРА**
      if (login === 'manager' && password === 'manager123') {
        req.session.user = {
          id: -1, // Или любой другой ID, который не конфликтует с существующими пользователями
          username: 'manager',
          email: 'manager@example.com',
          role: 'manager'
        };
        return res.redirect('/create-training-session');
      }
  
      // Если хардкодная проверка не прошла, продолжаем обычную аутентификацию
      const user = await loginUser(login, password);
  
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
  
      if (user.role === 'manager') {
        res.redirect('/create-training-session');
      } else {
        res.redirect('/index');
      }
  
    } catch (error) {
      console.error('Ошибка при входе:', error);
      res.status(400).send(error.message);
    }
  };
  
  export default loginController;