// src/components/Select/Select.jsx
import React from 'react';
import './Select.scss';

const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  required = false,
  error,
  disabled = false,
  name,
  multiple = false,
  ...rest 
}) => {
  return (
    <div className="select-wrapper">
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        className={`select-field ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        multiple={multiple}
        {...rest}
      >
        {!multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
};

export default Select;