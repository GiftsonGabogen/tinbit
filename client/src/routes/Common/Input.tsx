import type { SetStateAction } from "react";

interface Props {
  type: string;
  value: string;
  onChange: (e: SetStateAction<string>) => void;
}

function Input({ type, value, onChange, ...props }: Props) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 border-2 w-full p-2 mb-2"
      {...props}
    />
  );
}

export default Input;
