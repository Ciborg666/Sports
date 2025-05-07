// models/enrollment.js
import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js';
import User from './User.js'; // Импортируйте модель User
import TrainingSession from './TrainingSession.js'; // Импортируйте модель TrainingSession

const Enrollment = sequelizeDB.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    trainingSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TrainingSession,
            key: 'id'
        }
    }
}, {
    tableName: 'Enrollments',
    timestamps: true
});

// Определение связей
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Enrollment.belongsTo(TrainingSession, { foreignKey: 'trainingSessionId', as: 'trainingSession' });

// Связь многие-ко-многим между User и TrainingSession через Enrollment
User.belongsToMany(TrainingSession, { through: Enrollment, foreignKey: 'userId', otherKey: 'trainingSessionId', as: 'trainingSessions' });
TrainingSession.belongsToMany(User, { through: Enrollment, foreignKey: 'trainingSessionId', otherKey: 'userId', as: 'users' });

export default Enrollment;