import express from 'express';
import { getNews } from '../controllers/newsController.js'; // <--- Добавлено

const router = express.Router();

router.get('/', getNews); // <--- Изменено: теперь используем newsController
// или
router.get('/index', getNews); // <--- Если вы хотите, чтобы новости были на /index

export default router;