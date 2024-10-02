const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const User = sequelize.define('user', {
});

const Payment = sequelize.define('payment', {
});

// Relaciones entre modelos
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Payment, sequelize };