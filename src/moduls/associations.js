// src/models/associations.js
import User from './User.js';
import Cart from './Cart.js';
import CartItem from './cartItem.js';

const defineAssociations = (sequelizeDB) => {
    User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
    Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'cartItems' });
    CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });
};

export default defineAssociations;