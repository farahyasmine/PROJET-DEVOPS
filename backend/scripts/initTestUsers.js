require('dotenv').config();
const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');

(async () => {
  await sequelize.sync();

  const hash = await bcrypt.hash('123456', 10);

  await User.bulkCreate([
    {
      nom: 'Admin One',
      email: 'admin@test.com',
      mot_de_passe: hash,
      role: 'Admin',
      date_inscription: new Date()
    },
    {
      nom: 'Tech One',
      email: 'tech@test.com',
      mot_de_passe: hash,
      role: 'Technicien',
      date_inscription: new Date()
    },
    {
      nom: 'Employé One',
      email: 'emp@test.com',
      mot_de_passe: hash,
      role: 'Employe',
      date_inscription: new Date()
    }
  ]);

  console.log("Utilisateurs de test créés !");
  process.exit();
})();
