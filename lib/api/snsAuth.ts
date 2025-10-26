// lib/api/snsAuth.ts

export const snsLoginUrls = {
  customer: {
    google: "http://localhost:4000/api/auth/customer/google",
    kakao: "http://localhost:4000/api/auth/customer/kakao",
    naver: "http://localhost:4000/api/auth/customer/naver",
  },
  mover: {
    google: "http://localhost:4000/api/auth/mover/google",
    kakao: "http://localhost:4000/api/auth/mover/kakao",
    naver: "http://localhost:4000/api/auth/mover/naver",
  },
} as const;

export type SnsProvider = keyof typeof snsLoginUrls.customer;
export type UserType = keyof typeof snsLoginUrls;

export const handleSnsLogin = (
  provider: SnsProvider,
  userType: UserType = "customer",
) => {
  const loginUrl = snsLoginUrls[userType][provider];

  window.location.href = loginUrl;
};
