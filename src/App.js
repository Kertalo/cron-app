import './App.css';
import React, { useState, useEffect } from 'react';
import InputsRadio, { mods } from './components/InputsRadio';
import CronTab from './components/CronTab';
import Settings from './components/Settings';

const defaultValues = [
  { times: ['00:00'] },
  { dayOfWeek: 1, time: '00:00' },
  { dayOfMonth: 1, time: '00:00' },
  { month: 1, dayOfMonth: 1, time: '00:00' },
  { time: '00:00' }
];

function createHoursArray(array, id, value) {
  let newMinutes = [];
  let isIdExist = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      isIdExist = true;
      newMinutes.push({ id: id, value: value });
    }
    else
      newMinutes.push({ id: array[i].id, value: array[i].value });
  }
  if (!isIdExist)
    newMinutes.push({ id: id, value: value });
  return newMinutes;
}

function getValues(cronText) {
  let values=[];
  for (let i = 0; i < defaultValues.length; i++) {
    values.push(defaultValues[i]);
  }
  return values;
}

function getArrayFromCronElement(element) {
  let result = [];
  let temp = 0;
  let lastSymbol = '';

  for (let i = 0; i < element.length; i++)
  {
    if (element[i] === ',')
    {
      if (lastSymbol == '')
        return -1;
      result.push(temp);
      temp = 0;
    }
    else if (!isNaN(element[i]))
      temp = temp * 10 + Number(element[i]);
    else
      return -1;
    lastSymbol = element[i];
  }
  if (lastSymbol === ',')
    return -1;
  result.push(temp);
  return result;
}

function getObjectFromCron(cron) {
  cron = cron.split(' ');

  if (cron.length !== 5)
    return { error: 'Should be 5 elements in the cron-string' };

  let values = [];
  for (let i = 0; i < cron.length; i++)
    values[i] = getArrayFromCronElement(cron[i]);

  if (values[0].length !== 1)
    return { error: 'Should be 1 number in first element' };

  if (!(values[1].length >= 1))
    return { error: 'Should be at least 1 number in second element' };

  if (values[1].length > 1 && (cron[2] == '*' || cron[3] == '*' || cron[4] == '*'))
    return { error: 'The second element can have multiple values if it "Everyday" mode' };

  let object = {};
  return object;
  /*if (cron[4] === '*') {
    if (cron[3] === '*') {
      if (cron[2] === '*') {
        setRadio(mods[0]);
      }
      else {
        setRadio(mods[2]);
      }
    }
    else {
      setRadio(mods[3]);
    }
  }
  else {
    if (cron[3] === '*' && cron[2] === '*') {
      setRadio(mods[1]);
    }
    else {
      setRadio('');
      setError('Service doesn\'t support this line');
      return;
    }
  }
  setError('');*/
}

export default function App() {
  const [cronText, setCronText] = useState('* * * * *');
  const [value, setValue] = useState({});
  const [radio, setRadio] = useState('');
  const [error, setError] = useState('');

  const [minutes, setMinutes] = useState('*');
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState('*');
  const [months, setMonths] = useState('*');
  const [weeks, setWeeks] = useState([]);

  const radioChange = (e) => {
    setRadio(e.target.value);

    setMinutes('*');
    setHours([]);
    setDays('*');
    setMonths('*');
    setWeeks([]);
  }

  const cronChange = (e) => {
    setCronText(e.target.value);
    let object = getObjectFromCron(e.target.value);
    for (let i = 0; i < k.length; i++)
      console.log(k[i]);
  }

  useEffect(() => {
    let cron = '';
    
    cron += minutes + ' ';
    if (hours.length === 0)
      cron += '*';
    else {
      cron += hours[0].value;
      for (let i = 1; i < hours.length; i++)
        cron += ',' + hours[i].value;
    }
    cron += ' ';

    cron += days + ' ';

    cron += months + ' ';

    if (weeks.length === 0)
      cron += '*';
    else {
      cron += weeks[0].value;
      for (let i = 1; i < weeks.length; i++)
        cron += ',' + weeks[i].value;
    }

    setCronText(cron);
  }, [minutes, hours, days, months, weeks]);
  
  const changeTime = (e) => {
    let time = e.target.value;

    let minute = time.slice(3);
    if (minute[0] === '0')
      minute = minute.slice(1);
    setMinutes(minute);

    let hour = time.slice(0, 2);
    if (hour[0] === '0')
      hour = hour.slice(1);

    setHours(createHoursArray(hours, e.target.id, hour));
  }

  const changeDayOfWeek = (e) => {
    setWeeks([{ id: 0, value: e.target.value }]);
  }

  const changeDayOfMonth = (e) => {
    setDays(e.target.value);
  }

  const changeMonth = (e) => {
    setMonths(e.target.value);
  }

  return (
    <div className="App">
      <InputsRadio value={ radio } onChange={ radioChange }/>
      <Settings mode={ radio } 
        values={ getValues(cronText) }
        onChange={[
          { time: changeTime },
          { dayOfWeek: changeDayOfWeek, time: changeTime },
          { dayOfMonth: changeDayOfMonth, time: changeTime },
          { month: changeMonth, dayOfMonth: changeDayOfMonth, time: changeTime },
          { time: changeTime }
        ]}/>
      <CronTab onChange={ cronChange }>{ cronText }</CronTab>
      <p>{ error }</p>
    </div>
  );
}