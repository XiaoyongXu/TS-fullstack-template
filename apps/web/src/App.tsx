import { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const fetchItems = () => {
    setError(null);
    fetch('http://localhost:3001/api/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    fetch('http://localhost:3001/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItemName, description: newItemDescription }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        setNewItemName('');
        setNewItemDescription('');
        fetchItems();
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>Items</h1>
      <button onClick={fetchItems}>Refetch Items</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h2>Add New Item</h2>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
