import React, {useState} from 'react';

export default function CronTab({ children, onChange }) {

  return (
    <div>
      <input type="text" id="cron" value={ children } onChange={ onChange }/>
    </div>
  );
}