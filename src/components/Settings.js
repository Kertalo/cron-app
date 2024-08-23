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
      { mode === mods[0] && <Everyday values={ values } onChange={ onChange }/> }
      { mode === mods[1] && <Everyweek values={ values } onChange={ onChange }/> }
      { mode === mods[2] && <Everymonth values={ values } onChange={ onChange }/> }
      { mode === mods[3] && <Everyyear values={ values } onChange={ onChange }/> }
      { mode === mods[4] && <Custom values={ values } onChange={ onChange }/> }
    </>
  );
}
