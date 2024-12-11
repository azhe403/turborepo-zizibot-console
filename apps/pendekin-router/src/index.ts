import { useGetPendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Welcome To Pendekin Router!'
  });
});

app.get('/:pendekinPath', async c => {
  const pendekinPath = c.req.param('pendekinPath');
  const { status, data, result } = await useGetPendekin(pendekinPath);
  if (status === 200) {
    return c.redirect(result.originalUrl);
  }

  return c.json({
    executionTime: data.executionTime,
    message: 'Route not found!'
  });
});

export default app;
