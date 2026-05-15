'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4" style={{ backgroundColor: '#161b22', borderTop: '1px solid #30363d' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-4">复盘宝</h3>
            <p className="text-sm mb-4" style={{ color: '#8b949e' }}>
              基于「龙韵智趋」战法的AI智能股票复盘工具，专注龙头二波机会，助力投资者提升复盘效率。
            </p>
            <div className="flex items-center space-x-2">
              <span style={{ color: '#8b949e' }}>客服微信:</span>
              <span className="font-semibold" style={{ color: '#58a6ff' }}>FPB_Assistant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#e6edf3' }}>快速链接</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>龙韵智趋战法</a></li>
              <li><a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>每日复盘</a></li>
              <li><a href="#pricing" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>定价方案</a></li>
              <li><a href="#about" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>关于我们</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#e6edf3' }}>法律信息</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>用户协议</a></li>
              <li><a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>隐私政策</a></li>
              <li><a href="#" className="hover:text-[#58a6ff] transition-colors" style={{ color: '#8b949e' }}>免责声明</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-8" style={{ borderColor: '#30363d' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm" style={{ color: '#8b949e' }}>
              © {currentYear} 复盘宝. 保留所有权利.
            </p>
            <p className="text-sm mt-2 md:mt-0" style={{ color: '#8b949e' }}>
              本工具仅供参考，不构成投资建议
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
