import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

// Generate 4-digit verification code
function generateCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({
        code: 1,
        message: '请输入正确的手机号'
      })
    }

    // Development mode: use fixed code
    const code = '1234'
    // Store as Unix timestamp (seconds) to avoid timezone issues
    const expiresAt = Math.floor((Date.now() + 5 * 60 * 1000) / 1000)

    const db = getDb()
    // Delete old codes for this phone
    db.prepare('DELETE FROM verification_codes WHERE phone = ?').run(phone)

    // Insert new code
    db.prepare('INSERT INTO verification_codes (phone, code, expires_at) VALUES (?, ?, ?)').run(phone, code, expiresAt)

    console.log(`[Demo] Verification code for ${phone}: ${code}`)

    return NextResponse.json({
      code: 0,
      message: '验证码已发送'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      code: 1,
      message: '服务器错误'
    }, { status: 500 })
  }
}
