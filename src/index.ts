import express from 'express';
import indexRoute from '@routes/index.routes';

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Hello world' });
});

app.use('/', indexRoute);
// a
app.listen(3000, () => console.log('✔️ ...Server running on port 3000'));
