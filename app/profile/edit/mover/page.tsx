"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Buttons } from "@/components/common/button";
import SingupTextInput from "@/components/common/input/SingupTextInput";
import { useMe } from "@/hooks/useAuth";
import { MoverMe } from "@/types/auth";
import {
  ProfileEditForm,
  ValidationErrors,
  validateField,
  validateProfileEditForm,
  isProfileEditFormValid,
} from "@/utils/validation";
import { updateMoverBasicInfo } from "@/lib/api/profile";

export default function MoverBasicInfoEditPage() {
  const me = useMe().data as MoverMe;
  const router = useRouter();

  const [form, setForm] = useState<ProfileEditForm>({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors = validateProfileEditForm(form);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // 폼이 유효한지 확인하는 함수
  const isFormValidForSubmit = (): boolean => {
    return isProfileEditFormValid(form);
  };

  // 프로필 수정 핸들러
  const handleProfileUpdate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // API 호출
      await updateMoverBasicInfo({
        name: form.name,
        email: form.email,
        phone: form.phone,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
      });

      alert("기본정보 수정 성공");
      router.push("/my-page");
    } catch (error: any) {
      console.error("프로필 수정 오류:", error);

      // 에러 메시지 처리
      if (error.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-white pt-20">
      <div className="flex w-300 flex-col items-end gap-16 rounded-b-3xl bg-white p-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold text-gray-900">기본정보 수정</h1>
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
              <SingupTextInput
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="1"
                viewBox="0 0 500 1"
                fill="none"
              >
                <path d="M0 0.5H500" stroke="#F2F2F2" />
              </svg>
              <SingupTextInput
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
              <SingupTextInput
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
            </div>
            <div className="flex w-[500px] flex-col gap-8">
              <SingupTextInput
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
              <SingupTextInput
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
              <SingupTextInput
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
    </div>
  );
}
