'use client'

import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Strategy from './components/Strategy'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function Home() {
  const [user, setUser] = useState<{phone: string, trials: number, lifetime: number} | null>(null)

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0d1117' }}>
      <Navbar user={user} setUser={setUser} />
      <Hero user={user} setUser={setUser} />
      <Features />
      <Strategy />
      <Pricing user={user} />
      <Footer />
    </main>
  )
}
