// middleware/authMiddleware.js
const requireManager = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'manager') {
    next(); // Разрешаем доступ к маршруту
  } else {
    res.status(403).send('Доступ запрещен. Требуется роль менеджера.'); // Или перенаправление
  }
};

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next(); // Пользователь аутентифицирован, разрешаем доступ
  } else {
    res.status(401).send('Требуется аутентификация'); // Или перенаправление
  }
};

export { requireManager, requireAuth };