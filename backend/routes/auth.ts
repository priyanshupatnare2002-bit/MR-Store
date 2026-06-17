import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb, saveDb } from '../database';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'mrstore-secret-key-change-in-production';

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const db = await getDb();

  const existing = db.exec('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0 && existing[0].values.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  saveDb();

  const idResult = db.exec('SELECT last_insert_rowid()');
  const userId = idResult[0].values[0][0] as number;

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  return res.status(201).json({ token, user: { id: userId, name, email } });
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = await getDb();
  const result = db.exec('SELECT id, name, email, password FROM users WHERE email = ?', [email]);

  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const [id, name, userEmail, hashedPassword] = result[0].values[0] as [number, string, string, string];

  if (!bcrypt.compareSync(password, hashedPassword)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token, user: { id, name, email: userEmail } });
});

export default router;
