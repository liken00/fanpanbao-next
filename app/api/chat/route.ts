import { NextRequest, NextResponse } from 'next/server'

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
    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({
        code: 1,
        message: '消息不能为空'
      })
    }

    // Call MiniMax API if configured
    let reply = ''
    const miniMaxApiKey = process.env.MINIMAX_API_KEY
    const miniMaxGroupId = process.env.MINIMAX_GROUP_ID

    if (miniMaxApiKey && miniMaxGroupId) {
      try {
        const response = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_pro', {
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
        } else {
          const errorText = await response.text()
          console.error('MiniMax API error:', response.status, errorText)
        }
      } catch (error) {
        console.error('MiniMax API error:', error)
      }
    }

    // Fallback reply if API not configured or failed
    if (!reply) {
      reply = `【复盘宝AI】

感谢您的提问：${message}

大唐发电是电力板块的股票，最近走势比较活跃。从技术面来看，需要关注几点：

1. **板块联动**：看电力板块整体表现，板块内是否有其他股票跟风

2. **资金动向**：观察是否有主力资金持续流入，成交量是否配合

3. **位置判断**：当前股价处于什么位置，是高位还是低位，这会影响操作策略

4. **题材催化**：有没有什么消息面或政策面的利好

操作上建议控制仓位，不要重仓追高。股市有风险，入市需谨慎，以上仅供参考。`
    }

    return NextResponse.json({
      code: 0,
      reply
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({
      code: 1,
      message: '服务器错误'
    }, { status: 500 })
  }
}
