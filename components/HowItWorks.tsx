'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Lock, UserCheck, Store, FileCheck } from 'lucide-react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: Heart,
      title: 'Donors contribute funds',
      number: 1,
    },
    {
      icon: Lock,
      title: 'Funds are locked with spending rules',
      number: 2,
    },
    {
      icon: UserCheck,
      title: 'Beneficiaries receive access to essentials',
      number: 3,
    },
    {
      icon: Store,
      title: 'Verified stores are paid instantly',
      number: 4,
    },
    {
      icon: FileCheck,
      title: 'Every transaction is publicly auditable',
      number: 5,
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-dark-darker">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            How <span className="text-accent">Salvus</span> Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A transparent flow that ensures aid reaches those who need it most
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-dark border border-dark-lighter/30 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-4 mt-2">
                      <div className="p-4 rounded-xl bg-dark-lighter/30 border border-accent/20 group-hover:bg-accent/10 transition-colors">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-center text-white font-semibold text-sm leading-relaxed">
                      {step.title}
                    </h3>
                  </div>

                  {/* Arrow (Mobile/Tablet) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-accent/50 to-accent/20"></div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

