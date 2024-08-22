import React from 'react';
import InputRadio from './InputRadio.js';

export const mods = ['Everyday', 'Everyweek', 'Everymonth', 'Everyyear', 'Custom'];

export default function InputsRadio({ value, onChange }) {

  let inputsHTML = [];
  for (let i = 0; i < mods.length; i++)
    inputsHTML.push(<InputRadio value={ mods[i] } key={ i } onChange={ onChange } isChecked={ value === mods[i] }>{ mods[i] }</InputRadio>);

  return (
    <>
      { inputsHTML }
    </>
  );
}
