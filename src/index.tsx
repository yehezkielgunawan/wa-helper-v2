import { Hono } from 'hono'
import { renderer } from './renderer'
import { Script } from 'vite-ssr-components/hono'

const app = new Hono()

app.use(renderer)

const Home = () => {
  return (
    <main class="min-h-dvh bg-gray-50 text-gray-900">
      <div class="mx-auto max-w-screen-sm px-4 py-10">
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-semibold tracking-tight">WhatsApp Helper</h1>
          <p class="mt-2 text-sm text-gray-600">Quickly open a chat with prefilled number and message.</p>
        </div>

        {/* Client app mounts here */}
        <div id="app" class="mx-auto" />

        {/* Client script handled by vite-ssr-components for dev/prod */}
        <Script src="/src/client.tsx" />
      </div>
    </main>
  )
}

app.get('/', (c) => c.render(<Home />))

export default app
