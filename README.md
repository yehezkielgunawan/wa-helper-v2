# WhatsApp Helper v2

A modern, minimalist web application to help you send WhatsApp messages easily. Built with Hono.js, Vite, and Tailwind CSS.

## ✨ Features

- 🌍 **Country Code Selection**: Select country codes using HTML5 datalist dropdown from a comprehensive API
- 📱 **Mobile & Desktop Friendly**: Works seamlessly on WhatsApp Web and mobile app
- 📋 **Copy URL**: Copy the generated WhatsApp URL to clipboard with one click
- 🎨 **Clean UI**: Minimalist design with a light theme for better user experience
- ⚡ **Fast**: Built with modern tools for optimal performance
- 🚀 **Serverless**: Deployable to Cloudflare Workers

## 🚀 Quick Start

### Installation

This project uses `pnpm` as the package manager:

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

Visit `http://localhost:5173` to see the application in action.

### Build

```bash
pnpm run build
```

### Deploy to Cloudflare

```bash
pnpm run cf:deploy
```

## 📖 How It Works

1. **Select Country Code**: Choose from the country code datalist dropdown (defaults to +62 Indonesia)
2. **Enter Phone Number**: Input the recipient's phone number (without country code)
3. **Type Message** (Optional): Enter your message in the textarea
4. **Submit**: Click "Open WhatsApp" to:
   - Generate the WhatsApp URL
   - Open WhatsApp in a new tab with pre-filled data
   - Display the generated URL
5. **Copy URL** (Optional): Click "Copy URL" button to copy the generated URL to clipboard

The app generates URLs in this format:
- `https://wa.me/{countryCode}{phoneNumber}?text={message}` (with message)
- `https://wa.me/{countryCode}{phoneNumber}` (without message)

## 🛠️ Tech Stack

- **[Hono.js](https://hono.dev/)**: Lightweight web framework with JSX support
- **[Hono JSX/DOM](https://hono.dev/docs/guides/jsx-dom)**: React-like client components with hooks (useState, useEffect)
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Serverless deployment platform

## 📁 Project Structure

```
wa-helper-v2/
├── src/
│   ├── client/
│   │   ├── WhatsAppForm.tsx     # Client component with React hooks
│   │   └── main.tsx             # Client entry point
│   ├── components/
│   │   └── WhatsAppHelper.tsx   # Server-rendered wrapper
│   ├── index.tsx                # Application entry point
│   ├── renderer.tsx             # JSX renderer setup
│   └── style.css                # Tailwind CSS styles
├── public/
│   └── favicon.ico
├── package.json
├── vite.config.ts               # Vite config with Hono JSX DOM
├── wrangler.jsonc               # Cloudflare Workers config
└── tsconfig.json
```

## 🏗️ Architecture

The application uses a **hybrid SSR + Client Components** architecture:

- **Server-Side**: Hono renders the initial HTML shell
- **Client-Side**: Interactive form component hydrates on the client using Hono JSX with React-like hooks
- **React-like Hooks**: Uses `useState` and `useEffect` from `hono/jsx` for state management
- **Islands Architecture**: Only the interactive form is hydrated on the client, keeping the app lightweight

## 🔧 Configuration

### Cloudflare Types

For generating/synchronizing types based on your Worker configuration:

```bash
pnpm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## 🌐 API Reference

The country code data is fetched from:
```
https://raw.githubusercontent.com/yehezkielgunawan/country-call-code/main/db.json
```

## 📝 License

MIT

## 👨‍💻 Author

**Yehezkiel Gunawan**
- GitHub: [@yehezkielgunawan](https://github.com/yehezkielgunawan)

---

Made with ❤️ using Hono.js and Tailwind CSS
