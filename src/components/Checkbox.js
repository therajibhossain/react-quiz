export default function Checkbox({ text, ...rest }) {
  return (
    <label>
      <input type="checkbox" {...rest} />
      &nbsp; <span>{text}</span>
    </label>
  );
}
