import express, { Request, Response } from 'express';
import { todos } from './store';

const app = express();

app.use(express.json());
app.use((req: Request, res: Response, next: Function) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET /todos - return all todos
app.get('/todos', (_req: Request, res: Response) => {
  res.json(todos);
});

// GET /todos/:id - return a single todo
app.get('/todos/:id', (req: Request, res: Response) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// POST /todos - create a new todo
app.post('/todos', (req: Request, res: Response) => {
  if (!req.body.title) return res.status(400).json({ message: 'Title is required' });
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - update a todo
app.put('/todos/:id', (req: Request, res: Response) => {
  if (!req.body.title && req.body.completed === undefined)
    return res.status(400).json({ message: 'Title or completed is required' });
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

// DELETE /todos/:id - remove a todo
app.delete('/todos/:id', (req: Request, res: Response) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

// catch-all for unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(3000, () => console.log('Server running on port 3000'));