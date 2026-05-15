import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        code: 1,
        message: '未授权'
      }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({
        code: 1,
        message: 'token无效'
      }, { status: 401 })
    }

    const db = getDb()
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId) as { id: number; phone: string; trials: number; lifetime: number; referral_count: number } | undefined

    if (!user) {
      return NextResponse.json({
        code: 1,
        message: '用户不存在'
      }, { status: 404 })
    }

    return NextResponse.json({
      code: 0,
      user: {
        phone: user.phone,
        trials: user.trials,
        lifetime: user.lifetime
      }
    })
  } catch (error) {
    console.error('Status error:', error)
    return NextResponse.json({
      code: 1,
      message: '服务器错误'
    }, { status: 500 })
  }
}
