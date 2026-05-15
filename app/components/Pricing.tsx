'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Crown, Building } from 'lucide-react'

const plans = [
  {
    icon: Zap,
    name: '体验版',
    price: '¥0',
    original: '',
    badge: '',
    desc: '先体验再决定',
    features: [
      '免费3次AI问股',
      '龙韵智趋基础分析',
      '查看每日复盘报告',
      '有效期至用完次数',
    ],
    cta: '免费体验',
    ctaStyle: 'outline',
  },
  {
    icon: Crown,
    name: '永久解锁版',
    price: '¥0',
    original: '原价¥299',
    badge: '最受欢迎',
    desc: '介绍3人即可获得',
    features: [
      '无限次AI问股',
      '龙韵智趋完整战法',
      '每日飞书推送',
      '优先获取主线信号',
      '永久有效',
    ],
    cta: '介绍3人解锁',
    ctaStyle: 'primary',
  },
  {
    icon: Building,
    name: '企业版',
    price: '¥2999',
    original: '/年',
    badge: '',
    desc: '适合团队使用',
    features: [
      '永久解锁版全部功能',
      '最多10个飞书群推送',
      '专属客服1对1服务',
      '定制选股策略',
      '优先体验新功能',
    ],
    cta: '联系我们',
    ctaStyle: 'outline',
  },
]

export default function Pricing() {
  return (
    <section className="py-20 px-6 bg-[#0B0B0F]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">定价</h2>
          <p className="text-[#B0B0C3] text-lg">先体验，再决定。介绍3人即可永久免费</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative bg-[#151520] border rounded-2xl p-6 flex flex-col ${
                  plan.badge ? 'border-[#00D084]' : 'border-[#272736]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00D084] text-black text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.badge ? 'bg-[#00D084]/20' : 'bg-[#2563EB]/20'
                  }`}>
                    <Icon className={`w-5 h-5 ${plan.badge ? 'text-[#00D084]' : 'text-[#2563EB]'}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{plan.name}</h3>
                    <p className="text-[#717185] text-xs">{plan.desc}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.original && (
                    <span className="text-[#717185] text-sm ml-1">{plan.original}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#B0B0C3]">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.badge ? 'text-[#00D084]' : 'text-[#2563EB]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-[#00D084] text-black hover:bg-[#00b86e]'
                      : 'border border-[#272736] text-white hover:border-[#2563EB] hover:text-[#2563EB]'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
