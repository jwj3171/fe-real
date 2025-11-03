import type { ServiceType } from "@/types/move";
import type { Region } from "@/lib/api/mover";

export type Option<T> = {
  label: string;
  value: T;
};

export const SERVICE_OPTIONS: Option<ServiceType>[] = [
  { label: "소형이사", value: "SMALL" },
  { label: "가정이사", value: "FAMILY" },
  { label: "사무실이사", value: "OFFICE" },
];

export const REGION_OPTIONS: Option<Region>[] = [
  { label: "서울", value: "서울" },
  { label: "경기", value: "경기" },
  { label: "인천", value: "인천" },
  { label: "강원", value: "강원" },
  { label: "충북", value: "충북" },
  { label: "충남", value: "충남" },
  { label: "세종", value: "세종" },
  { label: "대전", value: "대전" },
  { label: "전북", value: "전북" },
  { label: "전남", value: "전남" },
  { label: "광주", value: "광주" },
  { label: "경북", value: "경북" },
  { label: "경남", value: "경남" },
  { label: "대구", value: "대구" },
  { label: "울산", value: "울산" },
  { label: "부산", value: "부산" },
  { label: "제주", value: "제주" },
];

// 하위 호환성을 위한 export (기존 코드에서 사용하던 이름)
export const serviceOptions = SERVICE_OPTIONS;
export const regionOptions = REGION_OPTIONS;
