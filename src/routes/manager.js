// routes/manager.js
import express from 'express';
const router = express.Router();
import { requireManager } from '../middleware/authMiddleware.js';

// Маршрут для панели управления менеджера
router.get('/create-training-session', requireManager, (req, res) => {
  // Отобразите страницу для менеджера (например, с помощью шаблонизатора)
  res.render('create-training-session'); // Предполагается, что у вас есть шаблон manager-dashboard.ejs
});


export default router;