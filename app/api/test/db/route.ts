import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const result = db.prepare('SELECT 1 as test').get()
    return NextResponse.json({
      code: 0,
      message: '数据库正常',
      result
    })
  } catch (error: any) {
    return NextResponse.json({
      code: 1,
      message: '数据库错误: ' + (error?.message || String(error)),
      stack: error?.stack
    }, { status: 500 })
  }
}
