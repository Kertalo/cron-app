export default function InputDaysOfWeek({ onChange }) {
  return (
    <>
      <input type="checkbox" onChange={ onChange } id='1' name="1"/>Monday
      <input type="checkbox" onChange={ onChange } id='2' name="2"/>Tuesday
      <input type="checkbox" onChange={ onChange } id='3' name="3"/>Wednesday
      <input type="checkbox" onChange={ onChange } id='4' name="4"/>Thursday
      <input type="checkbox" onChange={ onChange } id='5' name="5"/>Friday
      <input type="checkbox" onChange={ onChange } id='6' name="6"/>Saturday
      <input type="checkbox" onChange={ onChange } id='7' name="7"/>Sunday
    </>
  );
}
