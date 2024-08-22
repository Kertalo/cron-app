import React from 'react';
import InputDayOfWeek from './InputDayOfWeek';
import InputTime from './InputTime';

export default function Everyweek({ onChange, values }) {

  return (
    <>
      <InputDayOfWeek onChange={ onChange.dayOfWeek } value={ values.dayOfWeek }/>
      <InputTime onChange={ onChange.time } value={ values.time }/>
    </>
  );
}