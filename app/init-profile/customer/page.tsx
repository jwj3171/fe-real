"use client";

import { useState } from "react";
import Image from "next/image";
import { Buttons } from "@/components/common/button";
import { Chip, RegionChip } from "@/components/common/chip";
import { setCustomerInitProfile } from "@/lib/api/profile";
import { useRouter } from "next/navigation";

export default function CustomerInitProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const router = useRouter();

  const serviceOptions = [
    { label: "소형이사", value: "SMALL" },
    { label: "가정이사", value: "FAMILY" },
    { label: "사무실이사", value: "OFFICE" },
  ];

  const regionOptions = [
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInitProfile = async () => {
    const result = await setCustomerInitProfile({
      region: selectedRegion,
      serviceTypes: selectedServices,
    });

    alert("프로필 등록 성공");
    router.push("/landing");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md rounded-b-3xl bg-white">
        <div className="px-6 pt-16 pb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">프로필 등록</h1>
          <p className="text-sm text-gray-600">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
        </div>

        <div className="space-y-8 px-6 pb-8">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              프로필 이미지
            </h2>
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="프로필 이미지"
                      width={96}
                      height={96}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              이용 서비스
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
            </p>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map((service) => (
                <Chip
                  key={service.value}
                  selected={selectedServices.includes(service.value)}
                  onClick={() => {
                    setSelectedServices((prev) =>
                      prev.includes(service.value)
                        ? prev.filter((s) => s !== service.value)
                        : [...prev, service.value],
                    );
                  }}
                  size="lg"
                >
                  {service.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              내가 사는 지역
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              *내가 사는 지역은 언제든 수정 가능해요!
            </p>
            <div className="flex flex-wrap gap-3">
              {regionOptions.map((region) => (
                <RegionChip
                  key={region.value}
                  selected={selectedRegion === region.value}
                  onClick={() => setSelectedRegion(region.value)}
                  size="lg"
                >
                  {region.label}
                </RegionChip>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Buttons
              size="figma"
              fullWidth
              className="w-full"
              disabled={selectedServices.length === 0 || selectedRegion === ""}
              onClick={handleInitProfile}
            >
              시작하기
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}
