'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, User, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function Hero() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()

      if (data.code === 0) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${data.message || '出错了，请重试'}` }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: '⚠️ 网络异常，请检查网络连接' }])
    }

    setLoading(false)
  }

  return (
    <section className="pt-8 pb-16 px-4 md:pt-12 md:pb-20 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
            AI智能股票复盘工具
          </h1>
          <p className="text-lg text-[#B0B0C3] max-w-2xl mx-auto">
            基于「龙韵智趋」战法，专注龙头二波机会<br />
            发现主线 → 判断龙头 → 验证二波 → 精准买点
          </p>
        </motion.div>

        {/* AI Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#151520] rounded-2xl border border-[#272736] shadow-xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-[#00D084] px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">龙韵智趋 AI</div>
              <div className="text-white/70 text-sm">基于二波战法的智能分析</div>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm text-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>在线</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#0B0B0F] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-[#2563EB]" />
                </div>
                <p className="text-[#B0B0C3] mb-2">输入股票代码或问题，AI为你分析</p>
                <p className="text-[#717185] text-sm">例如：600519贵州茅台怎么样？</p>
                <p className="text-[#717185] text-sm">或：帮我找今日主线题材的龙头股</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-[#2563EB]' : 'bg-[#0B0B0F]'
                }`}>
                  {msg.role === 'user'
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-[#2563EB]" />
                  }
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#2563EB]/20 text-white rounded-tr-none'
                    : 'bg-[#0B0B0F] text-[#B0B0C3] rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B0B0F] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="bg-[#0B0B0F] px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#272736]">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入股票代码或问题..."
                className="flex-1 bg-[#0B0B0F] border border-[#272736] rounded-xl px-4 py-3 text-white placeholder:text-[#717185] focus:outline-none focus:border-[#2563EB] transition-all duration-300"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                发送
              </button>
            </div>
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-4 bg-[#151520] border border-[#272736] rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <span className="text-[#717185]">🎁 新用户免费体验</span>
            <span className="bg-[#2563EB] text-white px-3 py-1 rounded-full text-sm font-bold">3次</span>
            <span className="text-[#717185]">｜</span>
            <span className="text-[#717185]">介绍3人永久解锁</span>
            <span className="text-[#00D084] font-bold">免费</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
