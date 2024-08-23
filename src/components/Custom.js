import InputTime from './InputTime';
import React, {useState} from 'react';
import InputDaysOfWeek from './InputDaysOfWeek';
import InputEachTime from './InputEachTime';

export default function Custom({ values, onChange }) {
    
  return (
    <>
      <InputDaysOfWeek value={ values.daysOfWeek } onChange={ onChange.daysOfWeek }/>
      <InputEachTime value={ values.daysOfWeek } onChange={ onChange.daysOfWeek }/>
    </>
  );
}