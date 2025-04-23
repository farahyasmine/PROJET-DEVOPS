const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

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

module.exports = router;