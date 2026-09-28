import { useState } from "react";

const initial = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
  dueDate: ""
};

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(editingTask || initial);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    await onSubmit(form);
    if (!editingTask) setForm(initial);
  };

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Task Management</p>
          <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
        </div>
      </div>

      <label>
        Title *
        <input name="title" value={form.title} onChange={update} required />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={update} rows="3" />
      </label>

      <div className="two-columns">
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={update}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={update}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
      </div>

      <label>
        Due date
        <input type="date" name="dueDate" value={form.dueDate?.slice?.(0, 10) || ""} onChange={update} />
      </label>

      <div className="actions">
        <button className="button primary" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button className="button ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
