"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Buttons } from "@/components/common/button";
import SignupTextInput from "@/components/common/input/SignupTextInput";
import { Chip, RegionChip } from "@/components/common/chip";
import { useMe } from "@/hooks/useAuth";
import { CustomerMe } from "@/types/auth";
import {
  ProfileEditForm,
  ValidationErrors,
  validateField,
  validateProfileEditForm,
  isProfileEditFormValid,
} from "@/utils/validation";
import { updateCustomerBasicInfo } from "@/lib/api/profile";
import { useAlertModal } from "@/components/common/modal/AlertModal";

type CustomerProfileForm = {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  img: string;
  region: string;
  serviceTypes: string[];
};

export default function CustomerBasicInfoEditPage() {
  const me = useMe().data as CustomerMe;
  const router = useRouter();
  const { alert, Modal } = useAlertModal();

  const [form, setForm] = useState<CustomerProfileForm>({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    img: "",
    region: "",
    serviceTypes: [],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  // me 값이 생기면 상태 설정
  useEffect(() => {
    if (me) {
      setForm({
        name: me.name || "",
        email: me.email || "",
        phone: me.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        img: me.img || "",
        region: me.region || "",
        serviceTypes: (me as any).customerServiceTypes || [],
      });
    }
  }, [me]);

  // 입력 값 변경 시 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // 에러 초기화
    if (errors[id as keyof ValidationErrors]) {
      setErrors({ ...errors, [id]: "" });
    }

    // 실시간 유효성 검사 (이름, 이메일, 전화번호만)
    if (id === "name" || id === "email" || id === "phone") {
      const errorMessage = validateField(id, value, {
        newPassword: form.newPassword,
      });
      if (errorMessage) {
        setErrors({ ...errors, [id]: errorMessage });
      } else {
        const newErrors = { ...errors };
        delete newErrors[id as keyof ValidationErrors];
        setErrors(newErrors);
      }
    }
  };

  // 프로필 이미지 업로드
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm({ ...form, img: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 서비스 타입 선택
  const handleServiceToggle = (serviceValue: string) => {
    setForm({
      ...form,
      serviceTypes: form.serviceTypes.includes(serviceValue)
        ? form.serviceTypes.filter((s) => s !== serviceValue)
        : [...form.serviceTypes, serviceValue],
    });
  };

  // 지역 선택
  const handleRegionSelect = (regionValue: string) => {
    setForm({ ...form, region: regionValue });
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors = validateProfileEditForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // 폼이 유효한지 확인하는 함수
  const isFormValidForSubmit = (): boolean => {
    const basicFormValid = isProfileEditFormValid({
      name: form.name,
      email: form.email,
      phone: form.phone,
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    return basicFormValid && form.region !== "" && form.serviceTypes.length > 0;
  };

  // 프로필 수정 핸들러
  const handleProfileUpdate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // API 호출
      await updateCustomerBasicInfo({
        name: form.name,
        email: form.email,
        phone: form.phone,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
        img: form.img || undefined,
        region: form.region,
        serviceTypes: form.serviceTypes,
      });

      await alert({ title: "프로필 수정", message: "기본정보 수정 성공" });
      router.push("/search");
    } catch (error: any) {
      console.error("프로필 수정 오류:", error);

      // 에러 메시지 처리
      if (error.response?.data?.error?.message) {
        await alert({
          title: "오류",
          message: error.response.data.error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-white pt-[38px]">
      <div className="flex w-300 flex-col items-end gap-16 rounded-b-3xl bg-white p-10 pt-8">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold text-gray-900">프로필 수정</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1120"
            height="1"
            viewBox="0 0 1120 1"
            fill="none"
          >
            <path d="M0 0.5H1120" stroke="#F2F2F2" />
          </svg>
          <div className="flex flex-row justify-between">
            <div className="flex w-[500px] flex-col gap-8">
              <SignupTextInput
                id="name"
                label="이름"
                placeholder="이름을 입력해 주세요"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "gap-4 border-[#FF4F64]" : "gap-4"}
              />
              {errors.name && (
                <p className="text-[16px] text-[#FF4F64]">{errors.name}</p>
              )}
              <SignupTextInput
                id="email"
                label="이메일"
                placeholder="이메일을 입력해 주세요"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "gap-4 border-[#FF4F64]" : "gap-4"}
              />
              {errors.email && (
                <p className="text-[16px] text-[#FF4F64]">{errors.email}</p>
              )}
              <SignupTextInput
                id="phone"
                label="전화번호"
                placeholder="전화번호를 입력해 주세요"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? "gap-4 border-[#FF4F64]" : "gap-4"}
              />
              {errors.phone && (
                <p className="text-[16px] text-[#FF4F64]">{errors.phone}</p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="1"
                viewBox="0 0 500 1"
                fill="none"
              >
                <path d="M0 0.5H500" stroke="#F2F2F2" />
              </svg>
              <SignupTextInput
                id="currentPassword"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요"
                type="password"
                value={form.currentPassword}
                onChange={handleChange}
                className={
                  errors.currentPassword ? "gap-4 border-[#FF4F64]" : "gap-4"
                }
                showPasswordToggle={true}
              />
              {errors.currentPassword && (
                <p className="text-[16px] text-[#FF4F64]">
                  {errors.currentPassword}
                </p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="1"
                viewBox="0 0 500 1"
                fill="none"
              >
                <path d="M0 0.5H500" stroke="#F2F2F2" />
              </svg>
              <SignupTextInput
                id="newPassword"
                label="새 비밀번호"
                placeholder="새 비밀번호를 입력해 주세요"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                className={
                  errors.newPassword ? "gap-4 border-[#FF4F64]" : "gap-4"
                }
                showPasswordToggle={true}
              />
              {errors.newPassword && (
                <p className="text-[16px] text-[#FF4F64]">
                  {errors.newPassword}
                </p>
              )}
              <SignupTextInput
                id="confirmPassword"
                label="새 비밀번호 확인"
                placeholder="새 비밀번호를 다시 한 번 입력해 주세요"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={
                  errors.confirmPassword ? "gap-4 border-[#FF4F64]" : "gap-4"
                }
                showPasswordToggle={true}
              />
              {errors.confirmPassword && (
                <p className="text-[16px] text-[#FF4F64]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex w-[500px] flex-col gap-8">
              <div>
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  프로필 이미지
                </h2>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
                      {form.img ? (
                        <Image
                          src={form.img}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="1"
                viewBox="0 0 500 1"
                fill="none"
              >
                <path d="M0 0.5H500" stroke="#F2F2F2" />
              </svg>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    이용 서비스
                  </h2>
                  <p className="mb-4 text-sm text-gray-500">
                    *견적 요청 시 이용 서비스를 선택할 수 있어요.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {serviceOptions.map((service) => (
                    <Chip
                      key={service.value}
                      selected={form.serviceTypes.includes(service.value)}
                      onClick={() => handleServiceToggle(service.value)}
                      size="lg"
                    >
                      {service.label}
                    </Chip>
                  ))}
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="1"
                viewBox="0 0 500 1"
                fill="none"
              >
                <path d="M0 0.5H500" stroke="#F2F2F2" />
              </svg>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    내가 사는 지역
                  </h2>
                  <p className="mb-4 text-sm text-gray-500">
                    *견적 요청 시 지역을 설정할 수 있어요.
                  </p>
                </div>
                <div className="flex w-110 flex-wrap gap-x-[14px] gap-y-[18px]">
                  {regionOptions.map((region) => (
                    <RegionChip
                      key={region.value}
                      selected={form.region === region.value}
                      onClick={() => handleRegionSelect(region.value)}
                      size="lg"
                    >
                      {region.label}
                    </RegionChip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[500px] flex-row justify-end gap-5">
          <Buttons
            variant="outline"
            color="neutral"
            className="flex-grow-1"
            href="/my-page"
          >
            취소
          </Buttons>
          <Buttons
            disabled={isLoading || !isFormValidForSubmit()}
            onClick={handleProfileUpdate}
            className="flex-grow-1"
          >
            {isLoading ? "처리중..." : "수정하기"}
          </Buttons>
        </div>
      </div>
      <Modal />
    </div>
  );
}
