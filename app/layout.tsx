import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: '复盘宝 - AI智能股票复盘工具 | 龙韵智趋',
  description: '基于「龙韵智趋」战法的AI智能股票复盘工具，免费体验3次AI问股，介绍3人永久解锁。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-[#08080C] text-[#B0B0C3]">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
