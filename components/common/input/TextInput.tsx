"use client";

import React from "react";

type TextInputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id: string;
  label?: string;
};

export default function TextInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  label,
}: TextInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-2 py-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm ${className}`}
      />
    </div>
  );
}
