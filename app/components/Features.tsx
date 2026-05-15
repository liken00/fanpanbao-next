'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Bot, Bell, Shield, Wallet, Smartphone } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: '龙韵智趋战法',
    desc: '主线确认 → 龙头判断 → 二波验证 → 买点信号，完整实战体系',
    color: '#2563EB',
  },
  {
    icon: Bot,
    title: 'AI智能分析',
    desc: '输入任意股票问题，AI结合战法给出专业分析建议',
    color: '#00D084',
  },
  {
    icon: Bell,
    title: '每日复盘推送',
    desc: '每日18:00自动分析涨停板，识别主线题材和龙头股',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: '止损规则',
    desc: '跌破MA10当日收不回，等次日拉涨平仓，纪律第一',
    color: '#EF4444',
  },
  {
    icon: Wallet,
    title: '仓位管理',
    desc: '3板0.25成 / 4板0.35成 / 5板0.5成，严格分层',
    color: '#8B5CF6',
  },
  {
    icon: Smartphone,
    title: '飞书推送',
    desc: '每日复盘报告推送飞书群，手机随时查看',
    color: '#06B6D4',
  },
]

export default function Features() {
  return (
    <section className="py-20 px-6 bg-[#0B0B0F]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">核心功能</h2>
          <p className="text-[#B0B0C3] text-lg">四大模块，完整覆盖选股 → 分析 → 决策全流程</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-[#151520] border border-[#272736] rounded-2xl p-6 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-[#717185] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
