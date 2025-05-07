import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js';

const News = sequelizeDB.define('News', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  
  
  export default News;