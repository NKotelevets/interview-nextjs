"use client";

interface InputInterface {
  id?: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Input = (props: InputInterface) => {
  const { 
    id, 
    type, 
    value, 
    onChange, 
    placeholder, 
    disabled = false,
    className = "" 
  } = props;

  return (
    <input
      id={id}
      type={type || "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full p-3 border border-gray-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all duration-200
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        ${className}
      `}
    />
  );
};
