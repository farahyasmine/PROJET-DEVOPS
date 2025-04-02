module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      nom: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      mot_de_passe: DataTypes.STRING,
      role: DataTypes.ENUM('Employe', 'Technicien', 'Admin'),
      date_inscription: DataTypes.DATE
    });
  };
  