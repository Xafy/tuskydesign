import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Load from .env in real apps

export function generateToken(payload: any, expiresIn: any = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
