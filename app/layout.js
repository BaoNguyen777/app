import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Professional Copywriter | Words That Convert',
  description: 'Professional copywriting services for websites, emails, social media, and more. Compelling copy that connects with your audience and drives results.',
  keywords: 'copywriter, copywriting, content writer, brand storytelling, email marketing, website copy, social media content'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
