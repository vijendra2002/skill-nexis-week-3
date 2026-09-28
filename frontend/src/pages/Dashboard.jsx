import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: "All", priority: "All" });
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const params = {};
      if (filters.status !== "All") params.status = filters.status;
      if (filters.priority !== "All") params.priority = filters.priority;

      const { data } = await api.get("/tasks", { params });
      setTasks(data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters.status, filters.priority]);

  const saveTask = async (form) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
        setEditingTask(null);
      } else {
        await api.post("/tasks", form);
      }
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task");
    }
  };

  const toggleTask = async (task) => {
    const status = task.status === "Completed" ? "Pending" : "Completed";
    await api.put(`/tasks/${task._id}`, { status });
    await loadTasks();
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    active: tasks.filter((t) => t.status !== "Completed").length
  }), [tasks]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Task Manager</p>
          <h1>Hello, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="muted">Manage tasks through your React + Express + MongoDB stack.</p>
        </div>

        <div className="stats">
          <div><strong>{stats.total}</strong><span>Visible</span></div>
          <div><strong>{stats.active}</strong><span>Active</span></div>
          <div><strong>{stats.completed}</strong><span>Completed</span></div>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <div className="dashboard-grid">
        <TaskForm
          onSubmit={saveTask}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CRUD + Filtering</p>
              <h2>Your Tasks</h2>
            </div>
            <div className="filters">
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="empty">No tasks found. Create your first task.</div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
