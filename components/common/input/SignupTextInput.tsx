"use client";

import React, { useState } from "react";
import Image from "next/image";

type TextInputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id: string;
  label?: string;
  showPasswordToggle?: boolean;
};

export default function SignupTextInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  label,
  showPasswordToggle = false,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-lg font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`text-md h-13.5 w-full rounded-[16px] border border-gray-300 px-3.5 ${
            isPasswordField && showPasswordToggle ? "pr-12" : "pr-7"
          } focus:ring-2 focus:ring-orange-400 focus:outline-none ${className}`}
        />
        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                showPassword
                  ? "/icons/ic_visibility.svg"
                  : "/icons/ic_visibility-off.svg"
              }
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}
