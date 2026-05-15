'use client'

export default function Strategy() {
  const strategies = [
    {
      title: '主线确认',
      rule: '同板块≥2只同日2板',
      icon: '🎯'
    },
    {
      title: '龙头判断',
      rule: '三板当天封板时间最早',
      icon: '👑'
    },
    {
      title: '二波验证',
      rule: '连续两天首板≥5家+不跟跌',
      icon: '🔍'
    },
    {
      title: '买点信号',
      rule: '30分钟MA50+日K MA10±5%+缩量承接',
      icon: '📍'
    },
    {
      title: '止损规则',
      rule: '跌破日K MA10且当日收不回',
      icon: '🛑'
    },
    {
      title: '仓位管理',
      rule: '3板0.25成/4板0.35成/5板0.5成',
      icon: '📊'
    }
  ]

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0d1117' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">龙韵智趋战法</span>
        </h2>
        <p className="text-center mb-12" style={{ color: '#8b949e' }}>
          专注龙头二波机会的六维战法体系
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((item, index) => (
            <div
              key={index}
              className="card-hover rounded-xl p-6 text-center"
              style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#58a6ff' }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: '#e6edf3' }}>{item.rule}</p>
            </div>
          ))}
        </div>

        {/* System Prompt Info */}
        <div
          className="mt-12 rounded-xl p-6"
          style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#58a6ff' }}>战法核心原则</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ color: '#8b949e' }}>
            <p>• 主线确认：同板块≥2只同日2板=主线</p>
            <p>• 龙头判断：三板当天封板时间最早=龙头</p>
            <p>• 二波验证：连续两天首板≥5家+不跟跌</p>
            <p>• 买点信号：30分钟MA50+日K MA10±5%+缩量承接+题材异动</p>
            <p>• 仓位：3板0.25成/4板0.35成/5板0.5成</p>
            <p>• 止损：跌破日K MA10且当日收不回，等次日拉涨平仓</p>
            <p>• 卖出：涨30%-100%根据题材量能热度平仓</p>
          </div>
        </div>
      </div>
    </section>
  )
}
