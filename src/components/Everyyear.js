import React from 'react';
import InputMonth from './InputMonth';
import InputDayOfMonth from './InputDayOfMonth';
import InputTime from './InputTime';

export default function Everyyear({ onChange, values }) {

  return (
    <>
      <InputMonth onChange={ onChange.month } value={ values.month }/>
      <InputDayOfMonth onChange={ onChange.dayOfMonth } value={ values.dayOfMonth }/>
      <InputTime onChange={ onChange.time } value={ values.time }/>
    </>
  );
}