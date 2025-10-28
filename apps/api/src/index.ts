import express, { Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the API!' });
});

app.post('/api/echo', (req: Request, res: Response) => {
  res.json({ echo: req.body });
});

app.listen(port, () => {
  console.log(`[api]: Server is running at http://localhost:${port}`);
});
