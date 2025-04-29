// bd.js
import { Sequelize } from 'sequelize'; // Заменяем require на import



const sequelizeDB = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false // Отключаем логирование SQL-запросов в консоль (полезно для production)
});



console.log('db.js: sequelizeDB инициализирован');

export default sequelizeDB; // Экспортируем sequelize

