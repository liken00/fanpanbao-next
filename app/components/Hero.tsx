'use client'

import { useState } from 'react'

interface User {
  phone: string
  trials: number
  lifetime: number
}

interface HeroProps {
  user: User | null
  setUser: (user: User | null) => void
}

export default function Hero({ user, setUser }: HeroProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState('')

  const handleSubmit = async () => {
    if (!message.trim()) return

    const token = localStorage.getItem('token')
    if (!token) {
      alert('请先登录')
      return
    }

    if (!user?.lifetime && (user?.trials ?? 0) <= 0) {
      alert('免费次数已用完，请介绍3人永久解锁')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      if (data.reply) {
        setReply(data.reply)
        if (data.remaining_trials !== undefined) {
          setUser({ ...user!, trials: data.remaining_trials })
        }
      } else {
        alert(data.message || '请求失败')
      }
    } catch (err) {
      alert('网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#0d1117' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">AI智能股票复盘工具</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8" style={{ color: '#8b949e' }}>
          基于「龙韵智趋」战法，专注龙头二波机会
        </p>

        {/* AI Input Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入股票代码或问题，如：601919的二波机会分析..."
              className="w-full h-32 rounded-lg p-4 resize-none text-base"
              style={{ backgroundColor: '#0d1117', color: '#e6edf3' }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: '#58a6ff', color: '#0d1117' }}
            >
              {loading ? '分析中...' : '开始分析'}
            </button>
          </div>
        </div>

        {/* Reply Display */}
        {reply && (
          <div
            className="max-w-2xl mx-auto mb-8 rounded-xl p-6 text-left"
            style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
          >
            <h3 className="font-semibold mb-4" style={{ color: '#58a6ff' }}>AI分析结果</h3>
            <div className="whitespace-pre-wrap" style={{ color: '#e6edf3' }}>{reply}</div>
          </div>
        )}

        {/* Banner */}
        <div
          className="max-w-2xl mx-auto rounded-xl p-6"
          style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold" style={{ color: '#58a6ff' }}>免费3次</div>
            <div className="h-8 w-px" style={{ backgroundColor: '#30363d' }} />
            <div style={{ color: '#8b949e' }}>介绍3人永久解锁</div>
          </div>
        </div>
      </div>
    </section>
  )
}
