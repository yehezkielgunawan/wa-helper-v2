import { describe, it, expect } from 'vitest'
import app, { Home } from './index'
import { jsxRenderer } from 'hono/jsx-renderer'

// Minimal server test: ensure GET / returns HTML and contains known text
// We re-use the real renderer but intercept render to plain string

describe('Hono app', () => {
  it('responds on GET / with HTML containing title', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toContain('WhatsApp Helper')
    expect(html).toContain('<div id="app"')
  })
})
