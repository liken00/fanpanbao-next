'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, TrendingUp, BarChart2, Clock, Shield, Wallet, Bell } from 'lucide-react'

const longyunItems = [
  { label: '主线确认', href: '/strategy#mainline', desc: '同板块≥2只同日2板' },
  { label: '龙头判断', href: '/strategy#leader', desc: '三板封板时间最早' },
  { label: '二波验证', href: '/strategy#wave2', desc: '连续两天首板≥5家' },
  { label: '买点信号', href: '/strategy#entry', desc: 'MA50+MA10±5%缩量' },
  { label: '止损规则', href: '/strategy#stop', desc: '跌破MA10当日收不回' },
  { label: '仓位管理', href: '/strategy#position', desc: '3板0.25/4板0.35/5板0.5' },
]

const dailyItems = [
  { label: '今日涨停板', href: '/daily#hot', icon: TrendingUp },
  { label: '主线题材', href: '/daily#sector', icon: BarChart2 },
  { label: '龙头追踪', href: '/daily#leader', icon: Clock },
]

export default function Navbar() {
  const [isLongyunOpen, setIsLongyunOpen] = useState(false)
  const [isDailyOpen, setIsDailyOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-[8px] border-b border-[#272736] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#00D084] rounded-xl flex items-center justify-center text-lg font-bold text-white">
              📊
            </div>
            <span className="text-xl font-bold text-white">复盘宝</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#B0B0C3] hover:text-white transition-all duration-300">
              首页
            </Link>

            {/* 龙韵智趋下拉 */}
            <div
              className="relative"
              onMouseEnter={() => setIsLongyunOpen(true)}
              onMouseLeave={() => setIsLongyunOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#B0B0C3] hover:text-white transition-all duration-300">
                龙韵智趋战法
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLongyunOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLongyunOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#151520] rounded-xl shadow-lg border border-[#272736] overflow-hidden"
                  >
                    {longyunItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-[#0B0B0F] transition-all duration-300 border-b border-[#272736]/50 last:border-0"
                      >
                        <div className="text-white text-sm font-medium">{item.label}</div>
                        <div className="text-[#717185] text-xs mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 每日复盘下拉 */}
            <div
              className="relative"
              onMouseEnter={() => setIsDailyOpen(true)}
              onMouseLeave={() => setIsDailyOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#B0B0C3] hover:text-white transition-all duration-300">
                每日复盘
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDailyOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDailyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
                    className="absolute top-full left-0 mt-2 w-52 bg-[#151520] rounded-xl shadow-lg border border-[#272736] overflow-hidden"
                  >
                    {dailyItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-[#0B0B0F] transition-all duration-300 border-b border-[#272736]/50 last:border-0"
                        >
                          <Icon className="w-4 h-4 text-[#2563EB]" />
                          <span className="text-white text-sm">{item.label}</span>
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="text-[#B0B0C3] hover:text-white transition-all duration-300">
              定价
            </Link>

            <Link href="/about" className="text-[#B0B0C3] hover:text-white transition-all duration-300">
              关于我们
            </Link>

            <Link
              href="/login"
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              登录/注册
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="md:hidden bg-[#0B0B0F] border-t border-[#272736] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link href="/" className="text-white py-2" onClick={() => setIsMobileOpen(false)}>首页</Link>

                <div className="border border-[#272736] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-[#151520] text-white font-medium text-sm">龙韵智趋战法</div>
                  {longyunItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-[#B0B0C3] hover:text-white hover:bg-[#0B0B0F] text-sm transition-all"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border border-[#272736] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-[#151520] text-white font-medium text-sm">每日复盘</div>
                  {dailyItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-[#B0B0C3] hover:text-white hover:bg-[#0B0B0F] text-sm transition-all"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <item.icon className="w-3.5 h-3.5 text-[#2563EB]" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Link href="/pricing" className="text-white py-2" onClick={() => setIsMobileOpen(false)}>定价</Link>
                <Link href="/about" className="text-white py-2" onClick={() => setIsMobileOpen(false)}>关于我们</Link>

                <Link
                  href="/login"
                  className="block text-center px-5 py-3 bg-[#2563EB] text-white rounded-xl font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  登录/注册
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
