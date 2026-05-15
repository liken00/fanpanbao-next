import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'fanpanbao.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    const fs = require('fs')
    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')

    // Initialize tables
    try {
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone TEXT UNIQUE NOT NULL,
          trials INTEGER DEFAULT 3,
          lifetime INTEGER DEFAULT 0,
          referral_count INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS chat_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          message TEXT,
          reply TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS verification_codes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone TEXT NOT NULL,
          code TEXT NOT NULL,
          expires_at TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
    } catch (err) {
      console.error('Failed to create tables:', err)
      throw err
    }
  }
  return db
}

export interface User {
  id: number
  phone: string
  trials: number
  lifetime: number
  referral_count: number
  created_at: string
}

export interface ChatLog {
  id: number
  user_id: number
  message: string
  reply: string
  created_at: string
}

export interface VerificationCode {
  id: number
  phone: string
  code: string
  expires_at: string
  created_at: string
}
