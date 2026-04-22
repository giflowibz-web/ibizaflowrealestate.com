import type { Metadata } from 'next'
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('../styles/globals.css')

export const metadata: Metadata = {
  title: 'Ibiza Flow — Admin',
  description: 'Panel de administración Ibiza Flow Real Estate',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
