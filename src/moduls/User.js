import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js';

const User = sequelizeDB.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('user', 'manager', 'admin'), // Используем ENUM для ролей
        allowNull: false,
        defaultValue: 'user' // По умолчанию - обычный пользователь
    }
}, {
    tableName: 'Users', // Важно указать имя таблицы
    timestamps: true   // Важно указать чтобы sequelize понимал когда создан и обновлен user
});

export default User;