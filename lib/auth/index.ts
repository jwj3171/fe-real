// lib/auth/index.ts
import clientApi from "../api/axiosClient.client";
import { AUTH_API } from "../api/paths";

export const moverSignIn = async (email: string, password: string) => {
  const res = await clientApi.post(AUTH_API.MOVER_SIGNIN, { email, password });
  return res.data;
};

export const moverGetMe = async () => {
  const res = await clientApi.get(AUTH_API.MOVER_ME);
  return res.data;
};

export const moverLogout = async () => {
  const res = await clientApi.post(AUTH_API.MOVER_LOGOUT);
  return res.data;
};

export const customerSignIn = async (email: string, password: string) => {
  const res = await clientApi.post(AUTH_API.CUSTOMER_SIGNIN, {
    email,
    password,
  });
  return res.data;
};

export const customerGetMe = async () => {
  const res = await clientApi.get(AUTH_API.CUSTOMER_ME);
  return res.data;
};

export const customerLogout = async () => {
  const res = await clientApi.post(AUTH_API.CUSTOMER_LOGOUT);
  return res.data;
};

// 회원가입 API
export const customerSignup = async (data: {
  email: string;
  name: string;
  password: string;
  phone: string;
}) => {
  const res = await clientApi.post(AUTH_API.CUSTOMER_SIGNUP, data);
  return res.data;
};

export const moverSignup = async (data: {
  email: string;
  name: string;
  password: string;
  phone: string;
}) => {
  const res = await clientApi.post(AUTH_API.MOVER_SIGNUP, data);
  return res.data;
};

// 회원가입 후 자동 로그인 및 리다이렉트
export const customerSignupAndLogin = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  // 1. 회원가입
  await customerSignup(data);

  // 2. 자동 로그인
  const loginResult = await customerSignIn(data.email, data.password);

  return loginResult;
};

export const moverSignupAndLogin = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  // 1. 회원가입
  await moverSignup(data);

  // 2. 자동 로그인
  const loginResult = await moverSignIn(data.email, data.password);

  return loginResult;
};
