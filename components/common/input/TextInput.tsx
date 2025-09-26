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
        <label htmlFor={id} className="text-lg font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-md border border-gray-300 px-2 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none ${className}`}
      />
    </div>
  );
}
