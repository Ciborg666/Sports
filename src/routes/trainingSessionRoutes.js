// routes/trainingSessionRoutes.js
import express from 'express';
const router = express.Router();
import { getTrainingSessions, createTrainingSession, getTrainingSession, updateTrainingSession, deleteTrainingSession } from '../controllers/trainingSessionController.js';
import { requireManager } from '../middleware/authMiddleware.js';

// Маршрут для получения всех занятий на неделю
router.get('/training-sessions', getTrainingSessions);

// Маршрут для создания нового занятия (менеджер)
router.post('/training-sessions', requireManager, createTrainingSession);

// Маршрут для получения информации об одном занятии по ID
router.get('/training-sessions/:id', getTrainingSession);

// Маршрут для обновления занятия (менеджер)
router.put('/training-sessions/:id', requireManager, updateTrainingSession);

// Маршрут для удаления занятия (менеджер)
router.delete('/training-sessions/:id', requireManager, deleteTrainingSession);

export default router;