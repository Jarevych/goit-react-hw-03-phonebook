const NumberInput = ({ number, inputData }) => {
  return (
    <label>
      Number
      <input
        type="tel"
        name="number"
        value={number}
        pattern="\+?[0-9\s\-\(\)]+"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={inputData}
      />
    </label>
  );
};
export default NumberInput;
