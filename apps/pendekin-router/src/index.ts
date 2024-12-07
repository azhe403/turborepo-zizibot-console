import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Pendekin Router!'
  });
});

app.get('/:pendekinPath', async (c) => {
  return c.redirect('https://google.com');
});

const port = 7140;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
