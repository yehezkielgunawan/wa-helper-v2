### WhatsApp Helper (Hono + Vite + Tailwind)

Simple web app to open WhatsApp Web/App with a prefilled phone number and optional message. Built with `hono`, `hono/jsx`, Vite and Tailwind CSS.

### Features
- Uses a `datalist` to search countries and auto-fill the calling code
- Defaults country code to `+62`
- Responsive, minimalist UI with Tailwind
- Redirects to `https://wa.me/{phone}?text={message}`

### Development
```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

### Build & Deploy
```bash
pnpm build
pnpm cf:preview   # local preview of built assets
pnpm cf:deploy    # deploy with Wrangler
```

### Types for Cloudflare Workers
[Docs](https://developers.cloudflare.com/workers/wrangler/commands/#types)
```bash
pnpm cf-typegen
```

### Implementation Notes
- Server renders a shell in `src/index.tsx` and includes the client script `src/client.tsx`.
- Client uses `hono/jsx/dom` and `hono/jsx/dom/client` APIs to render and handle interactions.
- Country data is fetched from `https://raw.githubusercontent.com/yehezkielgunawan/country-call-code/main/db.json`.
