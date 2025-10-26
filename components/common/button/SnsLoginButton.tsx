"use client";

import React from "react";
import Image from "next/image";

type SnsProvider = "google" | "kakao" | "naver";

type SnsLoginButtonProps = {
  provider: SnsProvider;
  onClick: () => void;
};

const providerConfig = {
  google: {
    name: "Google",
    image: "/assets/login_google.png",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    borderColor: "border-gray-300",
  },
  kakao: {
    name: "Kakao",
    image: "/assets/login_kakao.png",
    bgColor: "bg-[#FEE500]",
    textColor: "text-gray-800",
    borderColor: "border-[#FEE500]",
  },
  naver: {
    name: "Naver",
    image: "/assets/login_naver.png",
    bgColor: "bg-[#03C75A]",
    textColor: "text-white",
    borderColor: "border-[#03C75A]",
  },
};

export default function SnsLoginButton({
  provider,
  onClick,
}: SnsLoginButtonProps) {
  const config = providerConfig[provider];

  return (
    <button onClick={onClick} className={`hover:opacity-50`}>
      <Image
        src={config.image}
        alt={`${config.name} 로그인`}
        width={72}
        height={72}
      />
    </button>
  );
}
