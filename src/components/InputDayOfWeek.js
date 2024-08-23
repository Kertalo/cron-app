import { useState } from "react";

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function InputDayOfWeek({ onChange, value }) {
  const [day, setDay] = useState(value);
  
  const onChangeDay = (e) => {
    setDay(e.target.value);
    onChange(e);
  }

  const daysHTML = [];
  for (let i = 0; i < days.length; i++) {
    daysHTML.push(<option key={ 'day' + i } value={ i + 1 }>{ days[i] }</option>);
  }

  return (
    <>
      <select id="week" value={ day } onChange={ onChangeDay }>
        { daysHTML }
      </select>
    </>
  );
}
