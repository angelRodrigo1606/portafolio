import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterTabs from './components/FilterTabs';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos from API
  const fetchTodos = async (filterStatus = 'all') => {
    setLoading(true);
    setError('');
    
    try {
      const params = {};
      if (filterStatus !== 'all') {
        params.status = filterStatus;
      }
      
      const response = await axios.get(`${API_BASE_URL}/todos`, { params });
      setTodos(response.data.todos || []);
    } catch (err) {
      setError('Failed to load todos. Please check your connection.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const createTodo = async (todoData) => {
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
      setTodos(prevTodos => [response.data, ...prevTodos]);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create todo';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update todo
  const updateTodo = async (id, updateData) => {
    setError('');
    
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updateData);
      setTodos(prevTodos => 
        prevTodos.map(todo => todo.id === id ? response.data : todo)
      );
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to update todo';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    setError('');
    
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    setError('');
    
    try {
      const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`);
      setTodos(prevTodos => 
        prevTodos.map(todo => todo.id === id ? response.data : todo)
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error toggling todo:', err);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchTodos(newFilter);
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Filter todos for display
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const todosStats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  };

  return (
    <div className="app">
      <div className="container">
        <Header stats={todosStats} />
        
        {error && (
          <ErrorMessage 
            message={error} 
            onClose={() => setError('')} 
          />
        )}
        
        <TodoForm 
          onSubmit={createTodo}
          onUpdate={updateTodo}
          editingTodo={editingTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />
        
        <FilterTabs 
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          stats={todosStats}
        />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={setEditingTodo}
          />
        )}
        
        {!loading && filteredTodos.length === 0 && (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>
              {filter === 'completed' && 'No completed tasks yet.'}
              {filter === 'pending' && 'No pending tasks. Great job!'}
              {filter === 'all' && 'Start by adding your first task above.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;