import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header = ({ stats }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <CheckSquare size={32} className="logo-icon" />
          <h1>ToDo App</h1>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;