import React from 'react';

export default function InputRadio({ children, value, onChange, isChecked }) {

  return (
    <div>
      <input type="radio" id={ value } name="type" checked={ isChecked } value={ value } onChange={onChange}/>
      <label htmlFor={ value }>{ children }</label>
    </div>
  );
}
