import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
const Input = (props: IInputProps) => {
  const {
    label,
    name,
    type = "text",
    placeholder,
    className,
    error,
    required,
    ...rest
  } = props;
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={name}>
          {label}:{required && <span className="text-red-400"> *</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        required={required}
        className={`w-full border-2 rounded-md p-1 ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />

      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default Input;
