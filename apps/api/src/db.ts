import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'your_username',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'your_database',
  password: process.env.POSTGRES_PASSWORD || 'your_password',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

export default pool;
