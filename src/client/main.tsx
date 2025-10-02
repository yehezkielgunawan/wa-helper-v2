import { render } from 'hono/jsx/dom'
import { WhatsAppForm } from './WhatsAppForm'

const root = document.getElementById('wa-form-root')
if (root) {
  render(<WhatsAppForm />, root)
}
