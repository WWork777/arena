import './globals.css'

export const metadata = {
  title: 'Arena Razvlecheni',
  description: 'Arena Razvlecheni Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

