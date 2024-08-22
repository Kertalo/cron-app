import InputTime from './InputTime';
import React, {useState} from 'react';

export default function Everyday({ values, onChange }) {
    
  const [times, setTimes] = useState(values.times);

  const timesChange=(e)=>{
    let newMinute = e.target.value.slice(3);
    let newTimes = [];
    for (let i = 0; i < times.length; i++)
      newTimes[i] = times[i].slice(0, 3) + newMinute;
    newTimes[e.target.id] = e.target.value;
    setTimes(newTimes);
    onChange(e);
  }

  const handleClick=(e)=>{
    let newTimes = [];
    for (let i = 0; i < times.length; i++)
      newTimes[i] = times[i];
    let minute = times[0].slice(3);
    newTimes[times.length] = '00:' + minute;
    for (let i = 0; i < newTimes.length; i++)
      console.log(newTimes[i])
    setTimes(newTimes);
  }

  const timesHTML = [];
  for (let i = 0; i < times.length; i++) {
    timesHTML.push(<InputTime key={ 'time' + i } id={ i } value={ times[i] } onChange={ timesChange }/>);
  }

  return (
    <>
      { timesHTML }
      <button onClick={handleClick}>+</button>
    </>
  );
}