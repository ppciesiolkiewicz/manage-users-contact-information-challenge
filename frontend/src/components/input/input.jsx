import React from 'react';
import './input.css'

const Input = ({ label, onChange, onBlur, name, value }) => (
  <div className="input">
    <label>{label}</label>
    <input
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  </div>
);

export default Input;
