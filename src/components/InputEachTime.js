import React, {useState} from 'react';

export default function InputEachTime({ onChange, value }) {
  const [time, setTime] = useState(value);

  const onChangeTime = (e) => {
    if (isNaN(e.target.value))
      return;
    setTime(e.target.value);
    onChange(e);
  }

  return (
    <>
      <input type="text" value={ time } onChange={ onChangeTime }/>
    </>
  );
}
