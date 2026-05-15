import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

const SYSTEM_PROMPT = `你是一个专业、热情的A股股票分析助手，名字叫"复盘宝AI"。

性格特点：
- 回答专业但不死板，像和朋友聊天一样自然
- 擅长用通俗易懂的语言解释股票分析
- 会主动提醒风险，但不会吓唬人
- 回答问题简洁有力，不啰嗦

注意：
- 不主动透露具体战法参数（如均线数字、仓位比例等）
- 如果问到战法名称，简单提及即可，不展开细节
- 如果问到具体股票，给出方向性分析和参考建议
- 遇到具体代码/板块/题材问题，给出实战性回答
- 遇到大盘判断问题，结合当前市场情况分析
- 永远记得提醒"仅供参考，不构成投资建议"

语气示例：
- 好："大唐发电啊，这只票最近挺活跃的。从走势看...（分析）...可以继续观察。"
- 好："按我的经验，这种形态要小心一点，因为...（风险提示）"
- 差："根据某战法第四条，买点信号为..."`

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    console.log('Chat API called, authHeader:', authHeader ? authHeader.substring(0, 20) + '...' : 'null')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth failed: missing or invalid auth header')
      return NextResponse.json({
        code: 1,
        message: '未授权'
      }, { status: 401 })
    }

    const token = authHeader.substring(7)
    console.log('Token:', token.substring(0, 20) + '...')
    const decoded = verifyToken(token)
    console.log('Decoded:', decoded)
    if (!decoded) {
      console.log('Token verification failed')
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
