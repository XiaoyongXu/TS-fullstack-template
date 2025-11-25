import express, { Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes';
import { createItemsTable } from './models/item.model';
import dotenv from 'dotenv';

dotenv.config();

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

const startServer = async () => {
  try {
    await createItemsTable();
    console.log('Database table initialized successfully.');
    app.listen(port, () => {
      console.log(`[api]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

startServer();
