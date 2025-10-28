import { Request, Response } from 'express';
import { Item } from '../models/item.model';

let items: Item[] = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 2, name: 'Item 3', description: 'This is item 3' },
];

export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

export const getItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export const createItem = (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newItem: Item = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    const { name, description } = req.body;
    items[itemIndex] = { ...items[itemIndex], name, description };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export const deleteItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    items = items.filter((i) => i.id !== id);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};
