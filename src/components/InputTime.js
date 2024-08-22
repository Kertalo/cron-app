import React, {useState} from 'react';

export default function InputTime({ onChange, id, value }) {

  const [time, setTime] = useState(value);

  const timeChange = (e) => {
    setTime(e.target.value);
    onChange(e);
  }

  return (
    <div>
      <input type="time" id={ id } onChange={ timeChange } value={ time }/>
    </div>
  );
}
