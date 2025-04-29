
import { loginUser } from '../services/login.js'; 

const loginController = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await loginUser(login, password);

        req.session.user = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        };

        res.redirect('/index');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default loginController;