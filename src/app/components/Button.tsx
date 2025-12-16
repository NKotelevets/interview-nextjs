"use client";

interface ButtonPropsInterface {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onClick, 
  type = "button",
  className = "",
  disabled = false
}: ButtonPropsInterface) {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded font-medium transition-colors
        flex items-center justify-center
        ${disabled 
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
        }
        ${className}
      `}
    >
      {title}
    </button>
  );
}
