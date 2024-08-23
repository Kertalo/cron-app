import React from 'react';
import InputMonth from './InputMonth';
import InputDayOfMonth from './InputDayOfMonth';
import InputTime from './InputTime';

export default function Everyyear({ onChange, values }) {

  return (
    <>
      <InputMonth value={ values.month } onChange={ onChange.month }/>
      <InputDayOfMonth value={ values.dayOfMonth } onChange={ onChange.dayOfMonth }/>
      <InputTime id='0' value={ values.time } onChange={ onChange.time }/>
    </>
  );
}