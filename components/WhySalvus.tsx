'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check } from 'lucide-react'

export default function WhySalvus() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const traditional = [
    { text: 'Cash misuse', icon: X },
    { text: 'No transparency', icon: X },
    { text: 'Slow settlements', icon: X },
  ]

  const salvus = [
    { text: 'Purpose-locked spending', icon: Check },
    { text: 'Direct store payments', icon: Check },
    { text: 'Real-time audit trail', icon: Check },
  ]

  return (
    <section ref={ref} className="py-24 bg-dark-darker border-y border-dark-lighter/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Why <span className="text-accent">Salvus</span> Exists
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A fundamental shift in how disaster relief is delivered
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Relief */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark border border-red-500/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Traditional Relief</h3>
            <div className="space-y-4">
              {traditional.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-gray-300 text-lg">{item.text}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Salvus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark border border-accent/30 rounded-xl p-8 relative overflow-hidden"
          >
            {/* Accent glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10"></div>
            
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="text-accent">Salvus</span>
            </h3>
            <div className="space-y-4">
              {salvus.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/30">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-gray-300 text-lg">{item.text}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

