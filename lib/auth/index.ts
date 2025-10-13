// lib/auth/index.ts
import clientApi from "../api/axiosClient.client";
import serverApi from "../api/axiosClient.server";

import { AUTH_API } from "../api/paths";

//환경분기
const isServer = typeof window === "undefined";

export const moverSignIn = async (email: string, password: string) => {
  const res = await clientApi.post(AUTH_API.MOVER_SIGNIN, { email, password });
  return res.data;
};

export const moverGetMe = async (token?: string) => {
  const api = isServer ? serverApi : clientApi;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await api.get(AUTH_API.MOVER_ME, {
    headers,
    withCredentials: true,
  });
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

export const customerGetMe = async (token?: string) => {
  const api = isServer ? serverApi : clientApi;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await api.get(AUTH_API.CUSTOMER_ME, {
    headers,
    withCredentials: true,
  });
  return res.data;
};

export const customerLogout = async () => {
  const res = await clientApi.post(AUTH_API.CUSTOMER_LOGOUT);
  return res.data;
};
