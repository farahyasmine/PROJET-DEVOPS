const { Ticket } = require('../models');

// Créer un ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      titre: req.body.titre,
      description: req.body.description,
      statut: "Ouvert",
      priorite: req.body.priorite,
      date_creation: new Date(),
      date_mise_a_jour: new Date(),
      id_employe: req.user.id
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lister tous les tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un ticket (par technicien ou admin)
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) return res.status(404).json({ error: "Ticket non trouvé" });

    await ticket.update({
      ...req.body,
      date_mise_a_jour: new Date()
    });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fermer un ticket (statut = "Fermé")
exports.closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) return res.status(404).json({ error: "Ticket non trouvé" });

    ticket.statut = "Fermé";
    ticket.date_mise_a_jour = new Date();
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
