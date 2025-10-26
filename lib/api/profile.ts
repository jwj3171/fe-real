import clientApi from "./axiosClient.client";

type CustomerInitProfile = {
  region: string;
  serviceTypes: string[];
  img?: string;
};

type MoverInitProfile = {
  nickname: string;
  career: string;
  introduction: string;
  description: string;
  serviceTypes: string[];
  regions: string[];
  img?: string;
};

type MoverProfileUpdate = {
  nickname?: string;
  career?: string;
  introduction?: string;
  description?: string;
  serviceTypes?: string[];
  regions?: string[];
  img?: string;
};

type MoverBasicInfoUpdate = {
  name?: string;
  email: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
};

export async function setCustomerInitProfile({
  region,
  serviceTypes,
}: CustomerInitProfile) {
  const result = await clientApi.patch("/customer/profile-setting", {
    region,
    serviceTypes,
  });
  return result;
}

export async function setMoverInitProfile({
  nickname,
  career,
  introduction,
  description,
  serviceTypes,
  regions,
}: MoverInitProfile) {
  const result = await clientApi.patch("/mover/profile-setting", {
    nickname,
    career,
    introduction,
    description,
    serviceTypes,
    regions,
  });
  return result;
}

export async function updateMoverProfile({
  nickname,
  career,
  introduction,
  description,
  serviceTypes,
  regions,
  img,
}: MoverProfileUpdate) {
  const result = await clientApi.patch("/mover/profile-edit", {
    nickname,
    career,
    introduction,
    description,
    serviceTypes,
    regions,
    img,
  });
  return result;
}

export async function updateMoverBasicInfo({
  name,
  email,
  phone,
  currentPassword,
  newPassword,
}: MoverBasicInfoUpdate) {
  const result = await clientApi.patch("/mover/basic-info-edit", {
    name,
    email,
    phone,
    currentPassword,
    newPassword,
  });
  return result;
}
