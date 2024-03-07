import Providers from '@/components/Providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koinos REST API',
  description: 'A REST API for Koinos'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.MAINTENANCE_MODE === 'ON') {
    return <div>Under maintenance</div>
  }

  return (
    <html lang="en" className="snap-y snap-mandatory">
      <body className={`${inter.className} no-scrollbar`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
