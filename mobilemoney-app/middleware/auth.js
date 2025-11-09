const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token
module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Pas de token, accès refusé' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // remplace 'SECRET_KEY' par ton secret
    req.user = decoded; // req.user contiendra id, role, email, etc.
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
 