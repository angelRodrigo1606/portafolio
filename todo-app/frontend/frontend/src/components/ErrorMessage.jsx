import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="error-close">
        <X size={16} />
      </button>
    </div>
  );
};

export default ErrorMessage;