'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-24 items-center justify-between px-12  ">
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-b from-gray-300 to-gray-500 bg-clip-text text-transparent">
              l3am.dev
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
