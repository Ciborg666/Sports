// User.js
import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js'; 

const User = sequelizeDB.define('User', {
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
    }
});

export default User;