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
        console.log('Executing (default): SELECT `id`, `username`, `password`, `createdAt`, `updatedAt`, `role` FROM `Users` AS `User` WHERE `User`.`username` = ' + login + ';'); // Обновите SQL-запрос, добавив role
        console.log('Найденный пользователь:', user);

        // Создаем и возвращаем новый объект, включающий роль пользователя
        return {
            id: user.id,
            username: user.username,
            name: user.name,  // Добавьте, если поле name есть в вашей модели
            email: user.email, // Добавьте, если поле email есть в вашей модели
            role: user.role  // Возвращаем роль пользователя
        };
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }
};

export { loginUser };