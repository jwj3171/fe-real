// components/header/HeaderRefactor.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMe } from "@/hooks/useAuth";

import HeaderLayout from "./HeaderLayout";
import ProfileSection from "./ProfileSection";
import NavMenu from "./NavMenu";
import logo from "@/public/assets/logo.svg";

export default function HeaderRefactor({
  userType,
}: {
  userType: "customer" | "mover" | null;
}) {
  const { data: me } = useMe();
  const [open, setOpen] = useState(false);

  const role = userType ?? "guest";

  return (
    <HeaderLayout
      left={
        <>
          <Link href="/landing" className="flex items-center md:hidden">
            <Image src={logo} alt="무빙 로고" width={96} height={36} priority />
          </Link>

          <div className="hidden md:flex">
            <NavMenu role={role} />
          </div>
        </>
      }
      right={
        <ProfileSection me={me} open={open} setOpen={setOpen} role={role} />
      }
      menu={<NavMenu role={role} layout="drawer" />}
    />
  );
}
