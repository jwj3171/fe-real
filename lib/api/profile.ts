import clientApi from "./axiosClient.client";

type CustomerInitProfile = {
  region: string;
  serviceTypes: string[];
  img?: string;
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
