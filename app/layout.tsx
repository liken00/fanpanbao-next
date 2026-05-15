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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#08080C] text-[#B0B0C3]">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
