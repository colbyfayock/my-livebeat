interface InputFileProps {
  className?: string;
  id?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const InputFile = ({ id, className = '', name, onChange, required }: InputFileProps) => {
  return (
    <input
      id={id}
      className={`block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      type="file"
      name={name}
      onChange={onChange}
      required={required}
    />
  );
}

export default InputFile;