'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-darker border-t border-dark-lighter/30 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About Salvus</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Emergency relief system ensuring transparent, accountable aid distribution.
            </p>
          </div>

          {/* Transparency */}
          <div>
            <h3 className="text-white font-semibold mb-4">Transparency</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Public Audit Trail
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Real-time Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Financial Statements
                </a>
              </li>
            </ul>
          </div>

          {/* Partner NGOs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Partner NGOs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Relief Foundation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Disaster Response Network
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Community Aid Trust
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <Link href="/campaign/start" className="w-full px-6 py-3 glass neon border-2 border-accent-neon shadow-neon text-white font-bold rounded-xl transition-all duration-300 mb-4 hover:scale-105 hover:bg-accent/20 hover:shadow-accent/40 inline-block text-center">
              Start a Relief Campaign
            </Link>
            <Link href="/transparency" className="w-full px-6 py-3 glass neon border-2 border-accent-neon shadow-neon text-white font-bold rounded-xl transition-all duration-300 mb-2 hover:scale-105 hover:bg-accent/20 hover:shadow-accent/40 inline-block text-center">
              View Transparency
            </Link>
            <p className="text-xs text-gray-500">
              Hackathon demo prototype
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-lighter/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Salvus. Emergency & Disaster Relief System.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Built for hackathon demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

