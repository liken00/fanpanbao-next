'use client'

import Link from 'next/link'
import { TrendingUp, BarChart2, Clock, Settings, CreditCard, Info, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0F] border-t border-[#272736] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#00D084] rounded-xl flex items-center justify-center text-lg font-bold text-white">
                📊
              </div>
              <span className="text-xl font-bold text-white">复盘宝</span>
            </Link>
            <p className="text-[#717185] text-sm leading-relaxed">
              基于「龙韵智趋」战法的AI智能股票复盘工具，帮助投资者发现龙头二波机会。
            </p>
          </div>

          {/* 产品 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">产品</h4>
            <ul className="space-y-2.5">
              {[
                { label: '核心功能', href: '/#features' },
                { label: '龙韵智趋战法', href: '/#strategy' },
                { label: '定价', href: '/pricing' },
                { label: 'AI问股', href: '/#hero' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#717185] hover:text-[#00D084] text-sm transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 战法 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">战法</h4>
            <ul className="space-y-2.5">
              {[
                { label: '主线确认', href: '/strategy#mainline' },
                { label: '龙头判断', href: '/strategy#leader' },
                { label: '二波验证', href: '/strategy#wave2' },
                { label: '买点信号', href: '/strategy#entry' },
                { label: '止损规则', href: '/strategy#stop' },
                { label: '仓位管理', href: '/strategy#position' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#717185] hover:text-[#00D084] text-sm transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 每日复盘 */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">每日复盘</h4>
            <ul className="space-y-2.5">
              {[
                { label: '今日涨停板', href: '/daily#hot', Icon: TrendingUp },
                { label: '主线题材', href: '/daily#sector', Icon: BarChart2 },
                { label: '龙头追踪', href: '/daily#leader', Icon: Clock },
              ].map((item) => {
                const Icon = item.Icon
                return (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center gap-2 text-[#717185] hover:text-[#00D084] text-sm transition-colors duration-300">
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <h4 className="text-white font-bold mb-4 mt-8 text-sm">联系</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-[#717185] text-sm">
                <Mail className="w-3.5 h-3.5" />
                Xiuqiang5515
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#272736] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#717185] text-xs">
            © 2026 复盘宝 | 本产品仅供AI分析参考，不构成投资建议，投资有风险，决策需谨慎
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#717185] hover:text-[#00D084] text-xs transition-colors duration-300">
              隐私协议
            </Link>
            <Link href="#" className="text-[#717185] hover:text-[#00D084] text-xs transition-colors duration-300">
              用户协议
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
