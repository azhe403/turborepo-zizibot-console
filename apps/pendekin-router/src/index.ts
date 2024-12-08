import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Welcome To Pendekin Router!'
  });
});

export default app;
