import express from 'express';
const router = express.Router();
import { enrollUser, unenrollUser, getEnrollmentsForUser } from '../controllers/enrollmentController.js';
import { requireAuth } from '../middleware/authMiddleware.js'; // Предположим, что у вас есть middleware для аутентификации

// Маршрут для записи пользователя на занятие
router.post('/enrollments', requireAuth, enrollUser); // Требуется аутентификация

// Маршрут для отмены записи пользователя на занятие
router.delete('/enrollments', requireAuth, unenrollUser); // Требуется аутентификация

// Маршрут для получения списка занятий, на которые записан пользователь
router.get('/enrollments/users/:userId', requireAuth, getEnrollmentsForUser); // Требуется аутентификация

export default router;