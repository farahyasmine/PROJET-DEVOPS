module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Ticket', {
      titre: DataTypes.STRING,
      description: DataTypes.TEXT,
      statut: DataTypes.ENUM('Ouvert', 'En cours', 'Résolu', 'Fermé'),
      priorite: DataTypes.ENUM('Faible', 'Moyenne', 'Élevée', 'Critique'),
      date_creation: DataTypes.DATE,
      date_mise_a_jour: DataTypes.DATE,
      id_employe: DataTypes.INTEGER,
      id_technicien: DataTypes.INTEGER
    });
  };
  