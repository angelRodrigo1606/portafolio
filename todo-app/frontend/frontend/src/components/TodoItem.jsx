import React from 'react';
import { Check, Edit3, Trash2, Calendar, AlertCircle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !todo.completed;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
      <div className="todo-content">
        <button
          onClick={() => onToggle(todo.id)}
          className={`toggle-button ${todo.completed ? 'checked' : ''}`}
          title={todo.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="todo-details">
          <div className="todo-header">
            <h3 className="todo-title">{todo.title}</h3>
            <div className="todo-meta">
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {todo.priority}
              </span>
              {todo.dueDate && (
                <div className={`due-date ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
                  {isOverdue(todo.dueDate) && <AlertCircle size={14} />}
                  <Calendar size={14} />
                  <span>{formatDate(todo.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
          
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          
          <div className="todo-timestamps">
            <span>Created: {formatDate(todo.createdAt)}</span>
            {todo.updatedAt !== todo.createdAt && (
              <span>Updated: {formatDate(todo.updatedAt)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="action-button edit-button"
          title="Edit todo"
        >
          <Edit3 size={16} />
        </button>
        
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(todo.id);
            }
          }}
          className="action-button delete-button"
          title="Delete todo"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;