'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'



// 1. Define types explicitly to avoid circular references
type SkillItem = {
  name: string
  level: number
  category: string
}

type LearningItem = {
  name: string
  progress: number
}

interface SkillsData {
  current: SkillItem[]
  learning: LearningItem[]
}

const skills: SkillsData = {
  current: [
    { name: 'Cybersecurity', level: 65, category: 'Security' },
    { name: 'Linux', level: 65, category: 'Systems' },
    { name: 'Penetration Testing', level: 70, category: 'Security' },
    { name: 'C', level: 60, category: 'Coding' },
    { name: 'Python', level: 60, category: 'Coding' },
  ],  
  learning: [
    { name: 'TypeScript', progress: 20 },
    { name: 'Rust', progress: 15 },
    { name: 'DevSecOps', progress: 5 },
  ]
}

export default function MapPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 md:py-32">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-gray-400/30 rounded-lg overflow-hidden shadow-2xl shadow-purple-400/20"
        >
          <div className="bg-gray-900 px-6 py-4 border-b-2 border-gray-400/30 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-base font-semibold text-gray-500 ">~/infos</span>
            <Link href="/" className="ml-auto hover:text-purple-300 transition-colors group animate-pulse">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
                stroke="currentColor" 
                className="w-8 h-8"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </Link>
          </div>

          <div className="p-6 min-h-[600px]">
            <AnimatePresence mode="wait">
              <WorkMode key="work" skills={skills} />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


function WorkMode({ skills }: { skills: SkillsData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex text-base md:text-xl items-center gap-2 mb-6">
          <span className="text-gray-400">$ cat infos.txt</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-slate-900 bg-clip-text text-transparent">
            ═══ HIGHLIGHT SKILLS ═══
          </h2>
          <div className="space-y-3">
            {skills.current.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">
                    <span className="text-gray-600">[{skill.category}]</span>{' '}
                    <span className="text-gray-400">{skill.name}</span>
                  </span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-100 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <h2 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-slate-900 bg-clip-text text-transparent">
            ═══ LEARNING PATH ═══
          </h2>
          <div className="space-y-3">
            {skills.learning.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (skills.current.length + idx) * 0.05 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">
                    <span className="text-gray-600">[ LEARNING ]</span>{' '}
                    <span className="text-gray-400">{skill.name}</span>
                  </span>
                  <span className="text-sm text-gray-500">{skill.progress}%</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-slate-400 to-sky-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ delay: (skills.current.length + idx) * 0.05 + 0.2, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
          <span className="animate-pulse">▊</span>
          <span suppressHydrationWarning>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  )
}