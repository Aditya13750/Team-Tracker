import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const Button = ({ onClick, children, type = 'button', variant = 'primary', disabled = false, className = '', ...props }) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, ...props }) => {
  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <input className="form-input" {...props} />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const Select = ({ label, options, error, ...props }) => {
  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <select className="form-input" {...props}>
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const TextArea = ({ label, error, ...props }) => {
  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <textarea className="form-input resize-vertical" {...props} />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
