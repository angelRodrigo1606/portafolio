const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const { Op } = require('sequelize');

// Get all todos with optional filtering
const getAllTodos = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = {};
    
    // Filter by completion status
    if (status === 'completed') {
      whereClause.completed = true;
    } else if (status === 'pending') {
      whereClause.completed = false;
    }
    
    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      whereClause.priority = priority;
    }
    
    const { count, rows: todos } = await Todo.findAndCountAll({
      where: whereClause,
      order: [
        ['completed', 'ASC'],
        ['priority', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      todos,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Get single todo by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    console.error('Error getting todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

// Create new todo
const createTodo = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    const { title, description, priority, dueDate } = req.body;
    
    const todo = await Todo.create({
      title: title.trim(),
      description: description?.trim(),
      priority: priority || 'medium',
      dueDate: dueDate || null
    });
    
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    const { id } = req.params;
    const { title, description, completed, priority, dueDate } = req.body;
    
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    // Update only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    
    await todo.update(updateData);
    
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    await todo.destroy();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// Toggle todo completion status
const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    await todo.update({ completed: !todo.completed });
    res.json(todo);
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({ error: 'Failed to toggle todo' });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
};