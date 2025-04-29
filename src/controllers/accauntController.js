// profileController.js
const accauntController = (req, res) => {
    const user = req.session.user;
  
    if (user) {
      console.log('Данные пользователя из сессии:', user); // Добавлено для отладки
      res.render('accaunt', { User: user }); // User: user - передаем объект user в шаблон под именем User
    } else {
      res.redirect('/avtorization');
    }
  };
  
  export default accauntController;