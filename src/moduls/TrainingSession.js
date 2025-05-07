// models/trainingSession.js
import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js';
import User from './User.js'; // Импортируйте модель User

const TrainingSession = sequelizeDB.define('TrainingSession', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
    
}, {
    tableName: 'TrainingSessions',
    timestamps: true
});

TrainingSession.belongsTo(User, { foreignKey: 'trainerId', as: 'trainer' }); // Связь: занятие принадлежит тренеру

export default TrainingSession;