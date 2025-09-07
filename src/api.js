const API_BASE = "http://localhost:8080/api/todos";

// Lấy tất cả todos
export async function getTodos() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// Lấy 1 todo theo id
export async function getTodoById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Todo not found");
  return res.json();
}

// Tạo mới todo
export async function createTodo(todo) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

// Cập nhật todo
export async function updateTodo(id, todo) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

// Xóa todo
export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
}
