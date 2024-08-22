import React from 'react';
import InputDayOfMonth from './InputDayOfMonth';
import InputTime from './InputTime';

export default function Everymonth({ onChange, values }) {

  return (
    <>
      <InputDayOfMonth onChange={ onChange.dayOfMonth } value={ values.dayOfMonth }/>
      <InputTime onChange={ onChange.time } value={ values.time }/>
    </>
  );
}