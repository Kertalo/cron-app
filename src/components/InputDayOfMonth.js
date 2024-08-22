import React, {useState} from 'react';

export default function InputDayOfMonth({ onChange, value }) {
  const [day, setDay] = useState(value);

  const onChangeDay = (e) => {
    setDay(e.target.value);
    onChange(e);
  }

  const daysHTML = [];
  for (let i = 0; i < 31; i++) {
    daysHTML.push(<option key={ 'day' + i } value={ i + 1 } id={ 'day' + i }>{ i + 1 }</option>);
  }

  return (
    <>
      <select id="month" value={ day } onChange={ onChangeDay }>
        { daysHTML }
      </select>
    </>
  );
}
