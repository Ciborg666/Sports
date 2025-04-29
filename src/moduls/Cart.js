import { DataTypes } from 'sequelize';
import sequelizeDB from '../db/db.js'; 

console.log('Cart.js: Начало выполнения');

const Cart = sequelizeDB.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'Carts',
    timestamps: true,
});

console.log('Cart.js: Модель Cart определена');

export default Cart;