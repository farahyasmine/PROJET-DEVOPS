const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/authMiddleware');

// Employé crée un ticket
router.post('/', auth(['Employe']), ticketController.createTicket);

// Tous les utilisateurs peuvent voir tous les tickets
router.get('/', auth(['Employe', 'Technicien', 'Admin']), ticketController.getAllTickets);

// Technicien/Admin peut mettre à jour
router.put('/:id', auth(['Technicien', 'Admin']), ticketController.updateTicket);

// Fermer un ticket
router.put('/:id/fermer', auth(['Technicien', 'Admin']), ticketController.closeTicket);

module.exports = router;
