import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (e) {
        setErr(e.message || "Load todos failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onAdd(e) {
    e.preventDefault();
    const desc = title.trim();
    if (!desc) return;
    try {
      const created = await createTodo({ description: desc, completed: false });
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } catch (e) {
      setErr(e.message || "Create failed");
    }
  }

  async function onToggle(t) {
    try {
      const updated = await updateTodo(t.id, {
        description: t.description,
        completed: !t.completed,
      });
      setTodos((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
    } catch (e) {
      setErr(e.message || "Toggle failed");
    }
  }

  async function onSaveEdit(id, text, done) {
    const desc = (text ?? "").trim();
    if (!desc) return;
    try {
      const updated = await updateTodo(id, { description: desc, completed: done });
      setTodos((prev) => prev.map((x) => (x.id === id ? updated : x)));
    } catch (e) {
      setErr(e.message || "Update failed");
    }
  }

  async function onDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setErr(e.message || "Delete failed");
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Todo App 📝</h1>

        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {err}
          </div>
        )}

        {/* Add form */}
        <form onSubmit={onAdd} className="mb-5 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập việc cần làm…"
            className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Thêm
          </button>
        </form>

        {/* List */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có công việc nào.</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={() => onToggle(t)}
                onSave={(text) => onSaveEdit(t.id, text, t.completed)}
                onDelete={() => onDelete(t.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TodoItem({ todo, onToggle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.description);

  return (
    <li className="flex items-center justify-between rounded-lg border bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={todo.completed}
          onChange={onToggle}
        />
        {editing ? (
          <input
            className="flex-1 rounded border px-2 py-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave(text);
                setEditing(false);
              } else if (e.key === "Escape") {
                setText(todo.description);
                setEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.description}
          </span>
        )}
      </div>

      <div className="ml-3 flex items-center gap-2">
        {editing ? (
          <>
            <button
              className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
              onClick={() => {
                onSave(text);
                setEditing(false);
              }}
            >
              Lưu
            </button>
            <button
              className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
              onClick={() => {
                setText(todo.description);
                setEditing(false);
              }}
            >
              Hủy
            </button>
          </>
        ) : (
          <button
            className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
            onClick={() => setEditing(true)}
          >
            Sửa
          </button>
        )}
        <button
          className="rounded border px-2 py-1 text-sm text-red-600 hover:bg-red-50"
          onClick={onDelete}
        >
          Xoá
        </button>
      </div>
    </li>
  );
}
