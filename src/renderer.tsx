import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WA Helper — Open WhatsApp without saving contacts</title>
        <meta
          name="description"
          content="A web app to save your time by directly chat without saving the phone number first."
        />
        <link rel="canonical" href="https://wa.yehezgun.com/" />
        <meta name="theme-color" content="#10b981" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WA Helper — Open WhatsApp without saving contacts" />
        <meta
          property="og:description"
          content="A web app to save your time by directly chat without saving the phone number first."
        />
        <meta
          property="og:image"
          content="https://og-image-rev.yehez.workers.dev/og?title=WA+Helper&description=A+web+app+to+save+your+time+by+directly+chat+without+saving+the+phone+number+first.&image=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F733%2F733585.png%3Fw%3D740%26t%3Dst%3D1667650978~exp%3D1667651578~hmac%3D0018014bd277113ec2ed856144f601742e5fe4d227412f3da634d52f1c4ab29f&siteName=wa.yehezgun.com"
        />
        <meta property="og:site_name" content="wa.yehezgun.com" />
        <meta property="og:url" content="https://wa.yehezgun.com/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WA Helper — Open WhatsApp without saving contacts" />
        <meta
          name="twitter:description"
          content="A web app to save your time by directly chat without saving the phone number first."
        />
        <meta
          name="twitter:image"
          content="https://og-image-rev.yehez.workers.dev/og?title=WA+Helper&description=A+web+app+to+save+your+time+by+directly+chat+without+saving+the+phone+number+first.&image=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F733%2F733585.png%3Fw%3D740%26t%3Dst%3D1667650978~exp%3D1667651578~hmac%3D0018014bd277113ec2ed856144f601742e5fe4d227412f3da634d52f1c4ab29f&siteName=wa.yehezgun.com"
        />
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 antialiased font-sans">{children}</body>
    </html>
  )
})
