import pool from '../db';

export interface Item {
  id: number;
  name: string;
  description: string;
}

export const createItemsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    );
  `;
  await pool.query(query);
};

export const getItemsDB = async (): Promise<Item[]> => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

export const getItemDB = async (id: number): Promise<Item | null> => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createItemDB = async (name: string, description: string): Promise<Item> => {
  const result = await pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

export const updateItemDB = async (id: number, name: string, description: string): Promise<Item | null> => {
  const result = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0] || null;
};

export const deleteItemDB = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
};