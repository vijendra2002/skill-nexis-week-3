export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.status === "Completed" ? "completed" : ""}`}>
      <div className="task-top">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description || "No description"}</p>
        </div>
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-meta">
        <span>{task.status}</span>
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="actions">
        <button className="button small" onClick={() => onToggle(task)}>
          {task.status === "Completed" ? "Mark Pending" : "Complete"}
        </button>
        <button className="button small ghost" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="button small danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
