import InputTime from './InputTime';
import React, {useState} from 'react';
import InputDaysOfWeek from './InputDaysOfWeek';

export default function Custom({ onChange }) {
    
  return (
    <>
      <InputDaysOfWeek onChange={ onChange }/>
    </>
  );
}