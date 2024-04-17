export default function SingleFormInput ({
    type,
    id,
    name,
    placeholder,
    value,
    onChange
}: {
    type: string;
    id: string;
    name: string;
    placeholder: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>; 
}) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border-b border-blue py-1 focus:outline-none focus:border-darkblue focus:border-b-2 bg-close2White transition-colors peer placeholder-transparent"
            autoComplete="off"
            required
        />
    )
}