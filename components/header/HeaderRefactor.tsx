// components/header/HeaderRefactor.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/contexts/authStore";
import { useMe } from "@/hooks/useAuth";

import HeaderLayout from "./HeaderLayout";
import ProfileSection from "./ProfileSection";
import NavMenu from "./NavMenu";

export default function HeaderRefactor({
  initialUserType,
}: {
  initialUserType?: "customer" | "mover";
}) {
  // const { userType, isAuthenticated, logout } = useAuthStore();
  const { data: me, status, isSuccess, isFetching } = useMe(initialUserType);
  console.log("header me = ", me);
  // 초기 렌더(log = undefined) 대신, 데이터가 들어온 "이후"에만 로그
  useEffect(() => {
    if (isSuccess) {
      console.log("header me (after hydration) =", me);
    }
  }, [isSuccess, me]);
  const [open, setOpen] = useState(false);

  return (
    <HeaderLayout
      left={<NavMenu me={me} />}
      right={<ProfileSection me={me} open={open} setOpen={setOpen} />}
    />
  );
}
