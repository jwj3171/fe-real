// userType, hasProfile 상태 관리 컨텍스트

import { createContext } from "react";
import { UserType } from "@/types/auth";

const UserContext = createContext<{
  userType: UserType | null;
  hasProfile: boolean;
}>({ userType: null, hasProfile: false });
