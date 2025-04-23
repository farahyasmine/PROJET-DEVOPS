const express = require('express');
const router = express.Router();
const { User, Ticket } = require('../models');
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const { Op } = require("sequelize");

// 🔹 Récupérer tous les utilisateurs
router.get('/users', auth(['Admin']), adminOnly, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['mot_de_passe'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Modifier le rôle d’un utilisateur
router.put('/users/:id/role', auth(['Admin']), adminOnly, async (req, res) => {
  const { role } = req.body;
  try {
    await User.update({ role }, { where: { id: req.params.id } });
    res.json({ message: 'Rôle mis à jour.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Supprimer un utilisateur
router.delete('/users/:id', auth(['Admin']), adminOnly, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Utilisateur supprimé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Assigner un technicien à un ticket
router.put('/tickets/:id/assign', auth(['Admin']), adminOnly, async (req, res) => {
  const { id_technicien } = req.body;
  try {
    await Ticket.update({ id_technicien }, { where: { id: req.params.id } });
    res.json({ message: "Technicien assigné avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Statistiques dashboard admin
router.get('/stats', auth(['Admin']), adminOnly, async (req, res) => {
  try {
    const totalTickets = await Ticket.count();
    const ticketsOuverts = await Ticket.count({ where: { statut: 'Ouvert' } });
    const ticketsResolus = await Ticket.count({ where: { statut: 'Résolu' } });

    const ticketsCritiques = await Ticket.findAll({
      where: { priorite: 'Critique' },
      order: [['date_creation', 'DESC']],
      limit: 5
    });

    const techniciens = await User.findAll({ where: { role: 'Technicien' } });
    const tempsParTech = [];

    for (const tech of techniciens) {
      const tickets = await Ticket.findAll({
        where: {
          id_technicien: tech.id,
          statut: 'Résolu',
          date_creation: { [Op.ne]: null },
          date_mise_a_jour: { [Op.ne]: null }
        }
      });

      const delais = tickets.map(t => new Date(t.date_mise_a_jour) - new Date(t.date_creation));
      const moyenne = delais.length
        ? Math.round(delais.reduce((a, b) => a + b, 0) / delais.length / 1000 / 60)
        : null;

      tempsParTech.push({
        nom: tech.nom,
        moyenne_resolution_min: moyenne
      });
    }

    res.json({
      totalTickets,
      ticketsOuverts,
      ticketsResolus,
      ticketsCritiques,
      tempsParTech
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;