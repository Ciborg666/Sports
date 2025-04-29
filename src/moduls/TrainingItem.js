// models/TrainingItem.js
import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js';
import MyTraining from './MyTraining.js';

const TrainingItem = sequelizeDB.define('TrainingItem', {
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    
    export default TrainingItem;