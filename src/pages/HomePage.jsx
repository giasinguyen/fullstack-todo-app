import { useEffect, useState } from "react";
import { getTodos } from "../api";

export default function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.description} {t.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
