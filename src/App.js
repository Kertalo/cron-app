import './App.css';
import React, { useState, useEffect } from 'react';
import InputsRadio, { mods } from './components/InputsRadio';
import CronTab from './components/CronTab';
import Settings from './components/Settings';

function createHoursArray(array, id, value) {
  let newArray = [];
  let isIdExist = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      isIdExist = true;
      newArray.push({ id: id, value: value });
    }
    else
      newArray.push({ id: array[i].id, value: array[i].value });
  }
  if (!isIdExist)
    newArray.push({ id: id, value: value });

  return newArray;
}

function getArrayFromCronElement(element) {
  let result = [];
  let temp = 0;
  let lastSymbol = '';

  for (let i = 0; i < element.length; i++)
  {
    if (element[i] === ',' && !isNaN(lastSymbol))
    {
      result.push(temp.toString());
      temp = 0;
    }
    else if (!isNaN(element[i]))
      temp = temp * 10 + Number(element[i]);
    else if (element[i] === '*' && lastSymbol === '')
      result.push('*');
    else if (element[i] === '/' && lastSymbol === '*')
      result.push('/');
    else
      return -1;
    lastSymbol = element[i];
  }
  if (lastSymbol === ',')
    return -1;
  if (lastSymbol !== '*')
    result.push(temp);
  return result;
}

function getObjectFromCron(cron) {
  cron = cron.split(' ');

  if (cron.length !== 5)
    return { error: 'Should be 5 elements in the cron-string' };

  let values = [];
  for (let i = 0; i < cron.length; i++) {
    values[i] = getArrayFromCronElement(cron[i]);
    if (values[i] === -1)
      return { error: (i + 1) + ' element is not correct' }
  }
  
  if (values[0].length !== 1)
    return { error: 'Should be 1 number in element 1' };
  console.log(values[2])
  if (values[2].length !== 1)
    return { error: 'Should be 1 number in element 3' };
  

  if (values[3].length !== 1)
    return { error: 'Should be 1 number in element 4' };

  if (!(values[1].length >= 1))
    return { error: 'Should be at least 1 number in second element' };

  if (values[1].length > 1 && (cron[2] === '*' || cron[3] === '*' || cron[4] === '*'))
    return { error: 'The second element can have multiple values if it "Everyday" mode' };

  let object = {};
  object['minutes'] = values[0];
  if (cron[4] === '*') {
    if (cron[3] === '*') {
      if (cron[2] === '*') {
        object['radio'] = mods[0];
      }
      else {
        object['radio'] = mods[2];
        object['days'] = values[2];
      }
    }
    else {
      object['radio'] = mods[3];
      object['days'] = values[2];
      object['months'] = values[3];
    }
  }
  else {
    if (cron[3] === '*' && cron[2] === '*') {
      object['radio'] = mods[1];
      object['weeks'] = values[4];
    }
    else {
      return { error: 'Service doesn\'t support this line' };
    }
  }
  return object;
}

export default function App() {
  const [cronText, setCronText] = useState('* * * * *');
  const [isCronEdit, setIsCronEdit] = useState(false);
  const [radio, setRadio] = useState('');
  const [error, setError] = useState('');

  const [minutes, setMinutes] = useState('0');
  const [hours, setHours] = useState([{ id: '0', value: '0' }]);
  const [days, setDays] = useState('*');
  const [months, setMonths] = useState('*');
  const [weeks, setWeeks] = useState([{ id: '0', value: '*' }]);
  const [eachTime, setEachTime] = useState('0');

  const radioChange = (e) => {
    setRadio(e.target.value);

    setMinutes('0');
    setHours([{ id: '0', value: '0' }]);
    setDays('*');
    setMonths('*');
    setWeeks([{ id: '0', value: '*' }]);
  }

  const cronChange = (e) => {
    setIsCronEdit(true);
    setCronText(e.target.value);
    let object = getObjectFromCron(e.target.value);
    if (object.error !== undefined) {
      setError(object.error);
      return;
    }
    setError('');
    setRadio(object.radio);
    if (object.minutes !== undefined)
      setMinutes(object.minutes[0]);
    if (object.days !== undefined)
      setDays(object.days[0]);
    if (object.months !== undefined)
      setMonths(object.months[0]);
  }

  useEffect(() => {
    if (isCronEdit)
      return;

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
    setIsCronEdit(false);
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
    setIsCronEdit(false);
    setWeeks([{ id: '-1', value: e.target.value }]);
  }

  const changeDaysOfWeek = (e) => {
    setIsCronEdit(false);
    //let array = weeks;
    setWeeks('');
  }

  const changeDayOfMonth = (e) => {
    setIsCronEdit(false);
    setDays(e.target.value);
  }

  const changeMonth = (e) => {
    setIsCronEdit(false);
    setMonths(e.target.value);
  }


  function getTime(hour, minute) {
    if (hour.length === 1)
      hour = '0' + hour;
    if (minute.length === 1)
      minute = '0' + minute;
    return hour + ':' + minute;
  }

  function getTimes() {
    let times = [];
    for (let i = 0; i < hours.length; i++)
      times.push(getTime(hours[i].value, minutes));
    return times;
  }

  const getDayOfMonth = () => {
    console.log(days);
    return days === "*" ? 1 : days;
  }

  const getMonth = () => {
    return months === "*" ? 1 : months;
  }

  const getDayOfWeek = () => {
    return weeks[0].value === "*" ? 1 : weeks[0].value;
  }

  const getDaysOfWeek = () => {
    return weeks[0].value === "*" ? 1 : weeks[0].value;
  }

  return (
    <div className="App">
      <InputsRadio value={ radio } onChange={ radioChange }/>
      <Settings mode={ radio }
        values={{ times: getTimes(), time: getTime(hours[0].value, minutes), dayOfMonth: getDayOfMonth(), month: getMonth(), dayOfWeek: getDayOfWeek(), daysOfWeek: getDaysOfWeek() }}
        onChange={{ time: changeTime, dayOfMonth: changeDayOfMonth, month: changeMonth, dayOfWeek: changeDayOfWeek, daysOfWeek: changeDaysOfWeek }}/>
      <CronTab onChange={ cronChange }>{ cronText }</CronTab>
      <p>{ error }</p>
    </div>
  );
}