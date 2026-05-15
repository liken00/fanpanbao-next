'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [showCode, setShowCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendCode = async () => {
    if (!phone || phone.length !== 11) {
      setError('请输入11位手机号')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (data.code === 0) {
        setStep('code')
      } else {
        setError(data.message || '发送失败')
      }
    } catch {
      setError('网络异常')
    }
    setLoading(false)
  }

  const verify = async () => {
    if (!code || code.length !== 4) {
      setError('请输入4位验证码')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      })
      const data = await res.json()
      if (data.code === 0) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location.href = '/'
      } else {
        setError(data.message || '验证失败')
      }
    } catch {
      setError('网络异常')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#08080C] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#00D084] rounded-xl flex items-center justify-center text-xl">
              📊
            </div>
            <span className="text-2xl font-bold text-white">复盘宝</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#151520] border border-[#272736] rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#0B0B0F] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-7 h-7 text-[#2563EB]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">登录 / 注册</h1>
            <p className="text-[#717185] text-sm">输入手机号开始体验AI问股</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <label className="text-[#B0B0C3] text-sm mb-2 block">手机号</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="请输入11位手机号"
                  className="w-full bg-[#0B0B0F] border border-[#272736] rounded-xl px-4 py-3 text-white placeholder:text-[#717185] focus:outline-none focus:border-[#2563EB] transition-all"
                />
              </div>
              <button
                onClick={sendCode}
                disabled={loading}
                className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white rounded-xl font-bold transition-all hover:scale-[1.02]"
              >
                {loading ? '发送中...' : '获取验证码'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#00D084] text-sm mb-2">
                <Bot className="w-4 h-4" />
                验证码已发送至 {phone}
              </div>
              <div className="relative">
                <label className="text-[#B0B0C3] text-sm mb-2 block">验证码</label>
                <input
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="请输入4位验证码"
                  className="w-full bg-[#0B0B0F] border border-[#272736] rounded-xl px-4 py-3 text-white placeholder:text-[#717185] focus:outline-none focus:border-[#2563EB] transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-[38px] text-[#717185] hover:text-white transition-colors"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                onClick={verify}
                disabled={loading}
                className="w-full py-3 bg-[#00D084] hover:bg-[#00b86e] disabled:opacity-50 text-black rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? '验证中...' : '登录 / 注册'}
              </button>
              <button
                onClick={() => { setStep('phone'); setCode('') }}
                className="w-full py-2 text-[#717185] hover:text-white text-sm transition-colors"
              >
                返回重新输入手机号
              </button>
            </div>
          )}

          {/* 试用说明 */}
          <div className="mt-6 p-4 bg-[#0B0B0F] rounded-xl">
            <p className="text-[#717185] text-xs leading-relaxed">
              🎁 注册即送 <span className="text-[#00D084] font-bold">3次</span> 免费AI问股<br />
              🎉 介绍 <span className="text-[#00D084] font-bold">3人</span> 即可永久解锁全部功能
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
