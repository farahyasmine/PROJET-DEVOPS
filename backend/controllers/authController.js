const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;

  try {
    const hash = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
      nom,
      email,
      mot_de_passe: hash,
      role,
      date_inscription: new Date()
    });

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });

    res.json({ token, user: { id: user.id, nom: user.nom, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
