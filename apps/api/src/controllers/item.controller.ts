import { Request, Response } from 'express';
import {
  getItemsDB,
  getItemDB,
  createItemDB,
  updateItemDB,
  deleteItemDB,
} from '../models/item.model';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await getItemsDB();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await getItemDB(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newItem = await createItemDB(name, description);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const updatedItem = await updateItemDB(id, name, description);
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteItemDB(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
