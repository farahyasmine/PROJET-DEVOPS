const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Accès refusé' });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: 'Token invalide' });
    }
    if (roles.length && !roles.includes(decoded.role)) {
        console.log("⛔️ Rôle NON autorisé :", decoded.role, "→ Attendu :", roles);
        return res.status(403).json({ error: 'Accès refusé' });
      }
      
  };
};
