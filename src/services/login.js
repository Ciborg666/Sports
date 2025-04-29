import User from '../moduls/User.js';
import bcrypt from 'bcrypt';

const loginUser = async (login, password) => {
    if (!login || !password) {
        throw new Error('Необходимо ввести логин и пароль.');
    }

    try {
        const user = await User.findOne({ where: { username: login } }); 

        if (!user) {
            throw new Error('Пользователь с таким логином не найден.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Неверный пароль.');
        }

        console.log('handleLogin вызван');
        console.log('Username:', login);
        console.log('Password:', password);
        console.log('Executing (default): SELECT `id`, `username`, `password`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`username` = ' + login + ';'); // Обновите SQL-запрос
        console.log('Найденный пользователь:', user);

        return user;
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }
};


export { loginUser };