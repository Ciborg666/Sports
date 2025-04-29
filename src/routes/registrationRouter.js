import express from 'express';
import registerController from '../controllers/registrationController.js'; 

const router = express.Router();


// Обработка отправки формы регистрации
router.post('/registration', registerController); 

export default router;