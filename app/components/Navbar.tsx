'use client'

import { useState } from 'react'

interface User {
  phone: string
  trials: number
  lifetime: number
}

interface NavbarProps {
  user: User | null
  setUser: (user: User | null) => void
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const strategyItems = [
    '主线确认', '龙头判断', '二波验证',
    '买点信号', '止损规则', '仓位管理'
  ]

  const dailyItems = [
    '今日复盘', '明日展望', '持仓分析'
  ]

  const handleLoginClick = () => {
    const phone = prompt('请输入手机号:')
    if (phone) {
      login(phone)
    }
  }

  const login = async (phone: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (data.code === 0) {
        const code = prompt('请输入验证码:')
        if (code) {
          verify(phone, code)
        }
      } else {
        alert(data.message || '发送失败')
      }
    } catch (err) {
      alert('网络错误')
    }
  }

  const verify = async (phone: string, code: string) => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      })
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        alert('登录成功')
      } else {
        alert(data.message || '验证失败')
      }
    } catch (err) {
      alert('网络错误')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: '#30363d' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">复盘宝</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#e6edf3' }}>Home</a>

            {/* 龙韵智趋战法 Dropdown */}
            <div
              className="dropdown relative"
              onMouseEnter={() => setActiveDropdown('strategy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#58a6ff] transition-colors" style={{ color: '#e6edf3' }}>
                <span>龙韵智趋战法</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`dropdown-menu absolute top-full left-0 mt-2 w-48 rounded-lg py-2 ${activeDropdown === 'strategy' ? 'open' : ''}`}
                style={{ backgroundColor: '#1a1f2e' }}
              >
                {strategyItems.map((item) => (
                  <a key={item} href="#" className="block px-4 py-2 hover:bg-[#161b22] transition-colors" style={{ color: '#e6edf3' }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* 每日复盘 Dropdown */}
            <div
              className="dropdown relative"
              onMouseEnter={() => setActiveDropdown('daily')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#58a6ff] transition-colors" style={{ color: '#e6edf3' }}>
                <span>每日复盘</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`dropdown-menu absolute top-full left-0 mt-2 w-40 rounded-lg py-2 ${activeDropdown === 'daily' ? 'open' : ''}`}
                style={{ backgroundColor: '#1a1f2e' }}
              >
                {dailyItems.map((item) => (
                  <a key={item} href="#" className="block px-4 py-2 hover:bg-[#161b22] transition-colors" style={{ color: '#e6edf3' }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <a href="#pricing" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#e6edf3' }}>定价</a>
            <a href="#about" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#e6edf3' }}>关于我们</a>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span style={{ color: '#8b949e' }}>{user.phone}</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#1a1f2e', color: '#58a6ff' }}>
                  剩余 {user.lifetime ? '永久' : `${user.trials}次`}
                </span>
                <button onClick={handleLogout} className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#58a6ff', color: '#0d1117' }}
              >
                登录/注册
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#e6edf3' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-16 right-0 bottom-0 w-64 md:hidden ${mobileMenuOpen ? 'open' : ''}`} style={{ backgroundColor: '#161b22' }}>
        <div className="p-4 space-y-4">
          <a href="#" className="block py-2" style={{ color: '#e6edf3' }}>Home</a>
          <div className="py-2">
            <span className="font-bold" style={{ color: '#e6edf3' }}>龙韵智趋战法</span>
            <div className="mt-2 ml-4 space-y-2">
              {strategyItems.map((item) => (
                <a key={item} href="#" className="block py-1" style={{ color: '#8b949e' }}>{item}</a>
              ))}
            </div>
          </div>
          <div className="py-2">
            <span className="font-bold" style={{ color: '#e6edf3' }}>每日复盘</span>
            <div className="mt-2 ml-4 space-y-2">
              {dailyItems.map((item) => (
                <a key={item} href="#" className="block py-1" style={{ color: '#8b949e' }}>{item}</a>
              ))}
            </div>
          </div>
          <a href="#pricing" className="block py-2" style={{ color: '#e6edf3' }}>定价</a>
          <a href="#about" className="block py-2" style={{ color: '#e6edf3' }}>关于我们</a>
          {user ? (
            <div className="pt-4 border-t" style={{ borderColor: '#30363d' }}>
              <p style={{ color: '#8b949e' }}>{user.phone}</p>
              <p className="py-2" style={{ color: '#58a6ff' }}>剩余 {user.lifetime ? '永久' : `${user.trials}次`}</p>
              <button onClick={handleLogout} className="w-full py-2 rounded-lg" style={{ backgroundColor: '#30363d', color: '#e6edf3' }}>
                退出
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="w-full py-3 rounded-lg mt-4"
              style={{ backgroundColor: '#58a6ff', color: '#0d1117' }}
            >
              登录/注册
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
