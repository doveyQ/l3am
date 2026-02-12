'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/doveyQ', icon: '→', d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},
  { name: 'LinkedIn', href: 'https://linkedin.com/in/leonwalder', icon: '→', d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.225zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" },
  { name: 'Email', href: 'mailto:walder.leon@protonmail.com', icon: '→', d: "m15.24 8.998 3.656-3.073v15.81H2.482C1.11 21.735 0 20.609 0 19.223V6.944l7.58 6.38a2.186 2.186 0 0 0 2.871-.042l4.792-4.284h-.003zm-5.456 3.538 1.809-1.616a2.438 2.438 0 0 1-1.178-.533L.905 2.395A.552.552 0 0 0 0 2.826v2.811l8.226 6.923a1.186 1.186 0 0 0 1.558-.024zM23.871 2.463a.551.551 0 0 0-.776-.068l-3.199 2.688v16.653h1.623c1.371 0 2.481-1.127 2.481-2.513V2.824a.551.551 0 0 0-.129-.36z"},
]

export default function Home() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 md:py-12">
      <div className="max-w-6xl w-full">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-gray-400/30 rounded-lg overflow-hidden shadow-2xl shadow-purple-400/20"
        >
          {/* Terminal Header */}
          <div className="bg-gray-900 px-6 py-4 border-b-2 border-gray-400/30 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-base font-semibold text-gray-500 ">leon@portfolio:~$</span>
          </div>

          {/* Terminal Content */}
          <div className="bg-gray-1000 p-8 md:p-14">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Intro Animation */}
              <div className="space-y-4 mb-8">
                <TypewriterText text="$ whoami" delay={0.2} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pl-4 space-y-2"
                >
                  <p className="text-xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-900 bg-clip-text text-transparent">
                    &gt; Leon / dovey
                  </p>
                </motion.div>
              </div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4 mb-8"
              >
                <TypewriterText text="$ cat about.txt" delay={1.4} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="pl-4 text-gray-400 max-w-4xl"
                >
                  <p className="mb-4 text-base md:text-lg font-medium">
                    Software Engineering student from Austria. <br />
                    Knowning some cybersecurity, secure low-level coding, web development and scripting. <br />
                    Into sports, nutrition and adventures.
                  </p>
                </motion.div>
              </motion.div>

              {/* Commands / Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="space-y-3"
              >
                <TypewriterText text="$ ls -la available_pages/" delay={2} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="pl-4 space-y-2"
                >
                  <Link
                    href="/blog"
                    className="group flex items-center text-lg gap-3 hover:text-purple-300 transition-colors"
                  >
                    <span className="text-sm md:text-lg text-gray-300">drwxr-xr-x</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-lg group-hover:underline">./blog</span>
                    <span className="text-gray-600 text-xs md:text-base">
                      (thoughts on code and security)
                    </span>
                  </Link>
                  
                  <Link
                    href="/infos"
                    className="group flex items-center text-lg gap-3 hover:text-purple-300 transition-colors"
                  >
                    <span className="text-lg text-gray-300">drwxr-xr-x</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-lg group-hover:underline">./infos</span>
                    <span className="text-gray-600 text-base">
                      (skills shown)
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                className="mt-8 flex items-center gap-2"
              >
                <span className="text-base md:text-xl text-purple-400">$</span>
                <span className="animate-pulse">▊</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Important Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16"
      >
        <div className="grid justify-items-center gap-2 md:grid-cols-3">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="group relative p-4 rounded-2xl hover:purple-500 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-full" />
              <svg
                className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" d={link.d} clipRule="evenodd" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function TypewriterText({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="text-gray-400 text-base md:text-xl"
    >
      {text}
    </motion.div>
  )
}