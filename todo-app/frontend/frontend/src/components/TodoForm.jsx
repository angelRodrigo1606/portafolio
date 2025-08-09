import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X } from 'lucide-react';

const TodoForm = ({ onSubmit, onUpdate, editingTodo, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when editing changes
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || '',
        description: editingTodo.description || '',
        priority: editingTodo.priority || 'medium',
        dueDate: editingTodo.dueDate ? editingTodo.dueDate.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.title.trim().length < 3) {
      return;
    }

    setIsSubmitting(true);

    try {
      const todoData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || null
      };

      let result;
      if (editingTodo) {
        result = await onUpdate(editingTodo.id, todoData);
        if (result.success) {
          onCancelEdit();
        }
      } else {
        result = await onSubmit(todoData);
        if (result.success) {
          setFormData({
            title: '',
            description: '',
            priority: 'medium',
            dueDate: ''
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!editingTodo;

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-header">
          <h2>
            {isEditing ? (
              <>
                <Edit3 size={20} />
                Edit Task
              </>
            ) : (
              <>
                <Plus size={20} />
                Add New Task
              </>
            )}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="cancel-button"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              required
              minLength={3}
              maxLength={255}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description (optional)..."
              rows={3}
              maxLength={1000}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formData.title.trim().length < 3}
          className={`submit-button ${isEditing ? 'edit-mode' : ''}`}
        >
          {isSubmitting ? (
            <span className="loading-text">
              {isEditing ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            <>
              {isEditing ? <Edit3 size={16} /> : <Plus size={16} />}
              {isEditing ? 'Update Task' : 'Add Task'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;