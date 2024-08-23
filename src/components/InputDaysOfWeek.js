import {days} from './InputDayOfWeek.js';

export default function InputDaysOfWeek({ onChange }) {

  let daysHTML = []
  for (let i = 0; i < days.length; i++)
    daysHTML.push(<div key={ i }><input type="checkbox" key={ i } value={ i + 1 } onChange={ onChange } id={ i } name={ i }/>{ days[i] }</div>)

  return (
    <>
      { daysHTML }
    </>
  );
}
