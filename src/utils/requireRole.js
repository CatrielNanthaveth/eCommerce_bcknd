const jwt = require('jsonwebtoken');

function requireRole(role) {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      const decoded = await jwt.verify(token, process.env.SECRET);

      if (!decoded) {
        return res.status(401).json({ message: 'Token inválido' });
      }

      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Acceso prohibido' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error en la verificación del token' });
    }
  };
}

module.exports = {
  requireRole
};
