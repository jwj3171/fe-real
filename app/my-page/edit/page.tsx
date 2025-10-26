"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Buttons } from "@/components/common/button";
import { Chip, RegionChip } from "@/components/common/chip";
import TextInput from "@/components/common/input/TextInput";
import TextArea from "@/components/common/input/TextArea";
import { useRouter } from "next/navigation";
import { updateMoverProfile } from "@/lib/api/profile";
import { useMe } from "@/hooks/useAuth";
import { MoverMe } from "@/types/auth";

export default function MoverInitProfilePage() {
  const me = useMe().data as MoverMe;
  const [profileImage, setProfileImage] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // me 값이 생기면 상태 설정
  useEffect(() => {
    if (me) {
      setNickname(me.nickname || "");
      setCareer(me.career || "");
      setIntroduction(me.introduction || "");
      setDescription(me.description || "");
      setSelectedServices(me.moverServiceTypes || []);
      setSelectedRegions(me.moverRegions || []);
    }
  }, [me]);
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

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const handleProfile = async () => {
    try {
      await updateMoverProfile({
        nickname,
        career,
        introduction,
        description,
        serviceTypes: selectedServices,
        regions: selectedRegions,
        img: profileImage || undefined,
      });

      alert("프로필 수정 성공");
      router.push("/my-page");
    } catch (error) {
      console.error("프로필 수정 오류:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    }
  };

  const isFormValid =
    nickname.trim() !== "" &&
    career.trim() !== "" &&
    introduction.trim() !== "" &&
    description.trim() !== "" &&
    selectedServices.length > 0 &&
    selectedRegions.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl rounded-b-3xl bg-white">
        <div className="px-6 pt-16 pb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            기사님 프로필 수정
          </h1>
          <p className="text-sm text-gray-600">프로필 정보를 수정해주세요.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 pb-8 lg:grid-cols-2">
          <div className="space-y-6">
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

            <TextInput
              id="nickname"
              label="별명 *"
              placeholder="사이트에 노출될 별명을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <TextInput
              id="career"
              label="경력 *"
              placeholder="기사님의 경력을 입력해 주세요"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />

            <TextInput
              id="introduction"
              label="한 줄 소개 *"
              placeholder="한 줄 소개를 입력해 주세요"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <TextArea
              id="description"
              label="상세 설명 *"
              placeholder="상세 내용을 입력해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                제공 서비스 *
              </h2>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((service) => (
                  <Chip
                    key={service.value}
                    selected={selectedServices.includes(service.value)}
                    onClick={() => handleServiceToggle(service.value)}
                    size="lg"
                  >
                    {service.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                서비스 가능 지역 *
              </h2>
              <div className="flex flex-wrap gap-3">
                {regionOptions.map((region) => (
                  <RegionChip
                    key={region.value}
                    selected={selectedRegions.includes(region.value)}
                    onClick={() => handleRegionToggle(region.value)}
                    size="lg"
                  >
                    {region.label}
                  </RegionChip>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-5 px-6 pb-8">
          <Buttons
            variant="outline"
            color="neutral"
            className="flex-grow-1"
            href="/my-page"
          >
            취소
          </Buttons>
          <Buttons
            disabled={!isFormValid}
            onClick={handleProfile}
            className="flex-grow-1"
          >
            수정하기
          </Buttons>
        </div>
      </div>
    </div>
  );
}
