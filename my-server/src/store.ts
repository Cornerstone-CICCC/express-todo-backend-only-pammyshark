interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const todos: Todo[] = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Walk the dog", completed: false },
  { id: 3, title: "Read a book", completed: true },
];