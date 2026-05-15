import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()
    console.log('Step 1: parsed request', { phone, code })

    if (!phone || !code) {
      return NextResponse.json({
        code: 1,
        message: '手机号和验证码不能为空'
      })
    }

    const db = getDb()
    console.log('Step 2: got db')

    // Verify code - compare Unix timestamps directly
    const now = Math.floor(Date.now() / 1000)
    const verification = db.prepare(
      'SELECT * FROM verification_codes WHERE phone = ? AND code = ? AND ? < expires_at ORDER BY id DESC LIMIT 1'
    ).get(phone, code, now) as { id: number; phone: string; code: string; expires_at: number } | undefined
    console.log('Step 3: verification query done', verification ? 'found' : 'not found')

    if (!verification) {
      return NextResponse.json({
        code: 1,
        message: '验证码错误或已过期'
      })
    }

    // Delete used code
    db.prepare('DELETE FROM verification_codes WHERE id = ?').run(verification.id)
    console.log('Step 4: deleted code')

    // Find or create user
    let user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone) as { id: number; phone: string; trials: number; lifetime: number; referral_count: number } | undefined
    console.log('Step 5: user lookup', user ? 'found' : 'not found')

    if (!user) {
      const result = db.prepare('INSERT INTO users (phone, trials) VALUES (?, 3)').run(phone)
      user = {
        id: result.lastInsertRowid as number,
        phone,
        trials: 3,
        lifetime: 0,
        referral_count: 0
      }
      console.log('Step 6: created user', user.id)
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, phone: user.phone })
    console.log('Step 7: generated token')

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
      message: '服务器错误: ' + (error?.message || String(error))
    }, { status: 500 })
  }
}
