import { verifyJwt } from '../utils/jwt.js';
import { env } from '../config/env.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.replace('Bearer ', '');
  try {
    const payload = verifyJwt(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
