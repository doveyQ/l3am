'use client'

import { motion } from 'framer-motion'
import ShinyText from '@/components/ui/shiny-text'
import GradientText from '@/components/ui/gradient-text'

export function HomeHero() {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <GradientText
          colors={['#2ba2cf', '#0f5873', '#2ba2cf', '#0f5873', '#2ba2cf']}
          animationSpeed={3}
          showBorder={true}
          className="px-6 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-full bg-black/40 border border-white/10 backdrop-blur-xl"
        >
          Software & Security Enthusiast
        </GradientText>

        <h1 className="pt-4 md:pt-8 text-6xl md:text-8xl font-extrabold tracking-tighter">
          <ShinyText className=" bg-clip-text" text="Leon" disabled={false} speed={3} />
          <span className="text-gray-500"> / dovey</span>
        </h1>

        <p className="max-w-2xl pb-4 mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
          Software Engineering student from Austria. Focused on cybersecurity,
          project management, and building high-performance software.
        </p>
      </motion.div>
    </div>
  )
}
