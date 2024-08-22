import React, {useState} from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function InputMonth({ onChange, value }) {
  const [month, setMonth] = useState(value);

  const onChangeMonth = (e) => {
    setMonth(e.target.value);
    onChange(e);
  }

  const monthsHTML = [];
  for (let i = 0; i < months.length; i++) {
    monthsHTML.push(<option key={ 'month' + i } value={ i + 1 }>{ months[i] }</option>);
  }

  return (
    <>
      <select id="month" value={ month } onChange={ onChangeMonth }>
        { monthsHTML }
      </select>
    </>
  );
}
