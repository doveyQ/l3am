'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import ShinyText from '@/components/ui/shiny-text'

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase italic text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              l3am.dev
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase italic tracking-wider">
              Blog
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            {mounted && (theme === 'dark' ? '☀️' : '🌙')}
          </button>
        </div>
      </div>
    </nav>
  )
}
