'use client'

import { motion } from 'framer-motion'
import { Search, Crown, Waves, Target, ShieldCheck, Layers } from 'lucide-react'

const strategies = [
  {
    num: '01',
    icon: Search,
    title: '主线确认',
    desc: '同板块 ≥2只 同日2板 = 主线确认。等待龙头浮出水面。',
    color: '#2563EB',
  },
  {
    num: '02',
    icon: Crown,
    title: '龙头判断',
    desc: '三板当天封板时间最早 = 龙头。≥双三板时看四板封板时间。',
    color: '#F59E0B',
  },
  {
    num: '03',
    icon: Waves,
    title: '二波验证',
    desc: '连续两天首板 ≥5家 + 不跟跌 = 二波确认。等待回调买点。',
    color: '#00D084',
  },
  {
    num: '04',
    icon: Target,
    title: '买点信号',
    desc: '30分钟MA50 + 日K MA10±5% + 缩量承接 + 题材异动',
    color: '#EF4444',
  },
  {
    num: '05',
    icon: ShieldCheck,
    title: '止损规则',
    desc: '跌破日K MA10且当日收不回 = 止损信号，等次日拉涨平仓',
    color: '#8B5CF6',
  },
  {
    num: '06',
    icon: Layers,
    title: '仓位管理',
    desc: '3板0.25成 / 4板0.35成 / 5板0.5成，单只最多5成，最多3只',
    color: '#06B6D4',
  },
]

export default function Strategy() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">龙韵智趋战法</h2>
          <p className="text-[#B0B0C3] text-lg">修哥多年实战验证的龙头二波体系</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-[#151520] border border-[#272736] rounded-2xl p-6 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-[#272736]">{item.num}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-white font-bold">{item.title}</h3>
                    </div>
                    <p className="text-[#717185] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
