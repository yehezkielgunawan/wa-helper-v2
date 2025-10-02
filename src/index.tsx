import { Hono } from 'hono'
import { renderer } from './renderer'
import { WhatsAppHelper } from './components/WhatsAppHelper'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<WhatsAppHelper />)
})

export default app
