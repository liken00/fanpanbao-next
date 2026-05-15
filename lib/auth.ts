import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fanpanbao-secret-key-2024'

export function generateToken(payload: { userId: number; phone: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: number; phone: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; phone: string }
  } catch {
    return null
  }
}
