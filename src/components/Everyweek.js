import React from 'react';
import InputDayOfWeek from './InputDayOfWeek';
import InputTime from './InputTime';

export default function Everyweek({ onChange, values }) {

  return (
    <>
      <InputDayOfWeek value={ values.dayOfWeek } onChange={ onChange.dayOfWeek }/>
      <InputTime id='0' value={ values.time } onChange={ onChange.time }/>
    </>
  );
}