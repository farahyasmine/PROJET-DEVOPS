module.exports = function(req, res, next) {
    if (req.user?.role !== 'Admin') {
      return res.status(403).json({ error: 'Accès interdit. Réservé aux administrateurs.' });
    }
    next();
  };
  