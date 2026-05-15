import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

const SYSTEM_PROMPT = `你是一个专业的A股股票分析师，精通「龙韵智趋」战法体系。

核心原则：
1. 主线确认：同板块≥2只同日2板=主线
2. 龙头判断：三板当天封板时间最早=龙头
3. 二波验证：连续两天首板≥5家+不跟跌
4. 买点信号：30分钟MA50+日K MA10±5%+缩量承接+题材异动
5. 仓位：3板0.25成/4板0.35成/5板0.5成
6. 止损：跌破日K MA10且当日收不回，等次日拉涨平仓
7. 卖出：涨30%-100%根据题材量能热度平仓

用户询问时，从以上战法角度分析，给出专业建议。`

export async function POST(request: NextRequest) {
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

    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({
        code: 1,
        message: '消息不能为空'
      })
    }

    const db = getDb()
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId) as { id: number; phone: string; trials: number; lifetime: number } | undefined

    if (!user) {
      return NextResponse.json({
        code: 1,
        message: '用户不存在'
      }, { status: 404 })
    }

    // Check usage limits
    if (!user.lifetime && user.trials <= 0) {
      return NextResponse.json({
        code: 1,
        message: '免费次数已用完，请介绍3人永久解锁'
      })
    }

    // Call MiniMax API if configured
    let reply = ''
    const miniMaxApiKey = process.env.MINIMAX_API_KEY
    const miniMaxGroupId = process.env.MINIMAX_GROUP_ID

    if (miniMaxApiKey && miniMaxGroupId) {
      try {
        const response = await fetch('https://api.minimax.com/v1/text/chatcompletion_pro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${miniMaxApiKey}`
          },
          body: JSON.stringify({
            model: 'abab6.5s-chat',
            tokens_to_generate: 1024,
            temperature: 0.7,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: message }
            ],
            group_id: miniMaxGroupId
          })
        })

        if (response.ok) {
          const data = await response.json()
          reply = data.choices?.[0]?.messages?.[0]?.content || ''
        }
      } catch (error) {
        console.error('MiniMax API error:', error)
      }
    }

    // Fallback reply if API not configured or failed
    if (!reply) {
      reply = `【复盘宝AI分析】

感谢您的提问：${message}

基于「龙韵智趋」战法分析：

1. 主线确认：需要确认该股票所在板块是否有≥2只股票同日涨停，形成主线效应。

2. 龙头判断：若该股票为板块龙头，需关注其封板时间是否为当日最早。

3. 二波机会：观察是否满足连续两天首板≥5家，且不跟随大盘下跌的条件。

4. 买点信号：等待30分钟MA50支撑配合日K MA10±5%范围缩量承接。

5. 仓位建议：根据涨停板数量确定仓位（3板0.25成/4板0.35成/5板0.5成）。

6. 止损位置：跌破日K MA10且当日无法收回时执行止损。

如有更多具体股票需要分析，请提供股票代码和具体问题。`
    }

    // Deduct trial if not lifetime member
    if (!user.lifetime) {
      db.prepare('UPDATE users SET trials = trials - 1 WHERE id = ?').run(user.id)
    }

    // Log chat
    db.prepare('INSERT INTO chat_logs (user_id, message, reply) VALUES (?, ?, ?)').run(user.id, message, reply)

    return NextResponse.json({
      code: 0,
      reply,
      remaining_trials: user.lifetime ? null : user.trials - 1
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({
      code: 1,
      message: '服务器错误'
    }, { status: 500 })
  }
}
