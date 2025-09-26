import React from "react";

interface TextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function TextArea({
  id,
  label,
  placeholder,
  value,
  onChange,
  className,
}: TextAreaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <label htmlFor={id} className="text-lg font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
    </div>
  );
}
