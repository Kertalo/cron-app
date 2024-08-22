import React from 'react';
import { mods } from './InputsRadio';
import Everyday from './Everyday';
import Everyweek from './Everyweek';
import Everymonth from './Everymonth';
import Everyyear from './Everyyear';
import Custom from './Custom';

export default function Settings({ mode, values, onChange }) {

  return (
    <>
      { mode === mods[0] && <Everyday values={ values[0] } onChange={ onChange[0].time }/> }
      { mode === mods[1] && <Everyweek values={ values[1] } onChange={ onChange[1] }/> }
      { mode === mods[2] && <Everymonth values={ values[2] } onChange={ onChange[2] }/> }
      { mode === mods[3] && <Everyyear values={ values[3] } onChange={ onChange[3] }/> }
      { mode === mods[4] && <Custom values={ values[4] } onChange={ onChange[4] }/> }
    </>
  );
}
