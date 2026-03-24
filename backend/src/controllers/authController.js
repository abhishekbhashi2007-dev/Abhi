import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signJwt } from '../utils/jwt.js';
import { env } from '../config/env.js';

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: normalizedEmail, passwordHash });

  const token = signJwt(
    { email: user.email, sub: user._id.toString() },
    env.jwtSecret,
    env.jwtExpiresIn
  );

  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signJwt(
    { email: user.email, sub: user._id.toString() },
    env.jwtSecret,
    env.jwtExpiresIn
  );

  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}
