'use client'

interface User {
  phone: string
  trials: number
  lifetime: number
}

interface PricingProps {
  user: User | null
}

export default function Pricing({ user }: PricingProps) {
  const plans = [
    {
      name: '体验版',
      price: '¥0',
      features: ['免费3次', '基础功能', 'AI问股'],
      cta: '免费试用',
      highlight: false
    },
    {
      name: '永久解锁',
      price: '免费',
      features: ['介绍3人', '永久使用', '全部功能', '优先客服'],
      cta: '介绍解锁',
      highlight: true
    },
    {
      name: '企业版',
      price: '¥2999',
      period: '/年',
      features: ['无限次数', 'API接口', '专属客服', '定制报告', '飞书推送'],
      cta: '联系我们',
      highlight: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4" style={{ backgroundColor: '#0d1117' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">定价方案</span>
        </h2>
        <p className="text-center mb-12" style={{ color: '#8b949e' }}>
          选择适合您的方案，开启智能复盘之旅
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-hover rounded-xl p-6 ${plan.highlight ? 'ring-2' : ''}`}
              style={{
                backgroundColor: '#161b22',
                border: plan.highlight ? '#58a6ff' : '#30363d',
                ...(plan.highlight && { ringColor: '#58a6ff' })
              }}
            >
              {plan.highlight && (
                <div
                  className="text-center py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ backgroundColor: '#58a6ff', color: '#0d1117' }}
                >
                  推荐
                </div>
              )}

              <h3 className="text-xl font-semibold text-center mb-2" style={{ color: '#e6edf3' }}>
                {plan.name}
              </h3>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: '#58a6ff' }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ color: '#8b949e' }}>{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center" style={{ color: '#8b949e' }}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="#58a6ff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: plan.highlight ? '#58a6ff' : 'transparent',
                  color: plan.highlight ? '#0d1117' : '#58a6ff',
                  border: plan.highlight ? 'none' : '1px solid #58a6ff'
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Current Plan Info */}
        {user && (
          <div className="text-center mt-8">
            <p style={{ color: '#8b949e' }}>
              当前账号: {user.phone} |{' '}
              <span style={{ color: '#58a6ff' }}>
                {user.lifetime ? '永久会员' : `剩余 ${user.trials} 次`}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
