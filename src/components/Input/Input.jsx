import React from 'react';
import './Input.scss';


const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error,
  disabled = false,
  name,
  ...rest 
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        {...rest}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;