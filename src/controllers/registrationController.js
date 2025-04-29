
import { registerUser } from '../services/registrationService.js'; // Убедитесь, что путь правильный

const registerController = async (req, res) => {
    try {
        console.log(req.body); // Добавлено для отладки
        const { username, email, password } = req.body;
        await registerUser(username, email, password);
        res.redirect('/avtorization');
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(400).send(error.message);
    }
};

export default registerController;