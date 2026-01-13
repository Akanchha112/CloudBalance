// src/components/Toggle/Toggle.jsx
import React from 'react';
import './Toggle.scss';

const Toggle = ({ 
  label, 
  checked = false, 
  onChange, 
  disabled = false,
  name,
  ...rest 
}) => {
  return (
    <div className="toggle-wrapper">
      <label className={`toggle-container ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          className="toggle-input"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          {...rest}
        />
        <span className="toggle-slider"></span>
      </label>
      {label && <span className="toggle-label">{label}</span>}
    </div>
  );
};

export default Toggle;