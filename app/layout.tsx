import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Professional Copywriter | Words That Convert',
  description: 'Professional copywriting services for websites, emails, social media, and more. Compelling copy that connects with your audience and drives results.',
  keywords: 'copywriter, copywriting, content writer, brand storytelling, email marketing, website copy, social media content',
  authors: [{ name: 'Professional Copywriter' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Professional Copywriter | Words That Convert',
    description: 'Professional copywriting services for websites, emails, social media, and more.',
    type: 'website',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
