'use client'

export default function Features() {
  const features = [
    {
      title: '龙韵智趋战法',
      desc: '独创六维战法体系，精准捕捉龙头二波机会',
      icon: '📊'
    },
    {
      title: 'AI智能分析',
      desc: '基于深度学习模型，实时分析股票走势',
      icon: '🤖'
    },
    {
      title: '每日复盘推送',
      desc: '自动追踪持仓，精准把握买卖点',
      icon: '📈'
    },
    {
      title: '止损规则',
      desc: '智能设置止损位，严格风险控制',
      icon: '🛡️'
    },
    {
      title: '仓位管理',
      desc: '科学仓位配比，收益最大化',
      icon: '💼'
    },
    {
      title: '飞书推送',
      desc: '即时消息推送，决策快人一步',
      icon: '📱'
    }
  ]

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0d1117' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="gradient-text">核心功能</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover rounded-xl p-6"
              style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#e6edf3' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#8b949e' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
