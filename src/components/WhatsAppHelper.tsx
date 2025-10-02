import { Script } from 'vite-ssr-components/hono'

export function WhatsAppHelper() {
  return (
    <>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 class="title">WhatsApp Helper</h1>
            <p class="subtitle">Send messages via WhatsApp easily</p>
          </div>

          <div id="wa-form-root"></div>
        </div>

        <footer class="footer">
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://github.com/yehezkielgunawan"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Yehezkiel Gunawan
            </a>
          </p>
        </footer>
      </div>

      <Script type="module" src="/src/client/main.tsx" />
    </>
  )
}
