import React from 'react';
import { List, CheckCircle, Clock } from 'lucide-react';

const FilterTabs = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    {
      key: 'all',
      label: 'All Tasks',
      icon: List,
      count: stats.total
    },
    {
      key: 'pending',
      label: 'Pending',
      icon: Clock,
      count: stats.pending
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: CheckCircle,
      count: stats.completed
    }
  ];

  return (
    <div className="filter-tabs">
      {filters.map(filter => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span>{filter.label}</span>
            <span className="filter-count">{filter.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;