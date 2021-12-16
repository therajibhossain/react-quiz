export default function Checkbox({ className, text, ...rest }) {
  return (
    <label className={className}>
      <input type="checkbox" {...rest} />
      &nbsp; <span>{text}</span>
    </label>
  );
}
