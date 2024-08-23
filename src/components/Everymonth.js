import React from 'react';
import InputDayOfMonth from './InputDayOfMonth';
import InputTime from './InputTime';

export default function Everymonth({ onChange, values }) {

  return (
    <>
      <InputDayOfMonth value={ values.dayOfMonth } onChange={ onChange.dayOfMonth }/>
      <InputTime id='0' value={ values.time } onChange={ onChange.time }/>
    </>
  );
}