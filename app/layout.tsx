import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SALVUS — Emergency & Disaster Relief System',
  description: 'Salvus ensures disaster aid is spent only on verified essentials and paid directly to trusted stores.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <button className="fixed top-6 right-8 z-50 glass neon border-2 border-accent-neon shadow-neon bg-accent hover:bg-accent-dark text-white font-bold rounded-xl px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-accent/40">
          Login
        </button>
        {children}
      </body>
    </html>
  )
}


