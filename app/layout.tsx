import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '复盘宝 - AI智能股票复盘工具',
  description: '基于「龙韵智趋」战法，专注龙头二波机会的AI股票复盘工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
