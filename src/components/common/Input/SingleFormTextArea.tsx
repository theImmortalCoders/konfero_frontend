export function SingleFormTextArea({
  id,
  name,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>; // Corrected the event handler type
}) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border-b border-blue py-1 focus:outline-none focus:border-darkblue focus:border-b-2 bg-close2White transition-colors peer placeholder-transparent"
      autoComplete="off"
      required
      style={{
        resize: "vertical",
        overflow: "auto",
        minHeight: "36px",
        maxHeight: "108px",
      }}
    />
  );
}
