import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()

    if (!phone || !code) {
      return NextResponse.json({
        code: 1,
        message: '手机号和验证码不能为空'
      })
    }

    const db = getDb()

    // Verify code
    const verification = db.prepare(
      'SELECT * FROM verification_codes WHERE phone = ? AND code = ? AND expires_at > datetime("now") ORDER BY id DESC LIMIT 1'
    ).get(phone, code) as { id: number; phone: string; code: string; expires_at: string } | undefined

    if (!verification) {
      return NextResponse.json({
        code: 1,
        message: '验证码错误或已过期'
      })
    }

    // Delete used code
    db.prepare('DELETE FROM verification_codes WHERE id = ?').run(verification.id)

    // Find or create user
    let user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone) as { id: number; phone: string; trials: number; lifetime: number; referral_count: number } | undefined

    if (!user) {
      const result = db.prepare('INSERT INTO users (phone, trials) VALUES (?, 3)').run(phone)
      user = {
        id: result.lastInsertRowid as number,
        phone,
        trials: 3,
        lifetime: 0,
        referral_count: 0
      }
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, phone: user.phone })

    return NextResponse.json({
      code: 0,
      token,
      user: {
        phone: user.phone,
        trials: user.trials,
        lifetime: user.lifetime
      }
    })
  } catch (error: any) {
    console.error('Verify error:', error?.message, error?.stack)
    return NextResponse.json({
      code: 1,
      message: '服务器错误: ' + (error?.message || '未知错误')
    }, { status: 500 })
  }
}
