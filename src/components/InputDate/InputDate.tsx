interface InputDateProps {
  className?: string;
  id?: string;
  name: string;
  type?: 'date' | 'datetime-local';
  required?: boolean;
}

const InputDate = ({ id, className = '', type = 'date', name, required }: InputDateProps) => {
  return (
    <input
      id={id}
      className={`block w-full text-slate-900 border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      type={type}
      name={name}
      required={required}
    />
  );
}

export default InputDate;