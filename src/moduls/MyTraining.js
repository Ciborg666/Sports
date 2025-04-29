// models/MyTraining.js
import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js'; 
import TrainingItem from './TrainingItem.js'; // Импортируем TrainingItem

const MyTraining = sequelizeDB.define('MyTraining', {
    trainingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    
    export default MyTraining;