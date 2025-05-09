const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT
});

const User = require('./user')(sequelize, DataTypes);
const Ticket = require('./ticket')(sequelize, DataTypes);

module.exports = { sequelize, User, Ticket };
sequelize.authenticate()
  .then(() => console.log('DB connectée avec succès'))
  .catch((err) => console.error('Erreur de connexion DB:', err));
