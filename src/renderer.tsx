import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 antialiased">{children}</body>
    </html>
  )
})
