"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Buttons } from "@/components/common/button";
import SignupTextInput from "@/components/common/input/SignupTextInput";
import SnsLoginButton from "@/components/common/button/SnsLoginButton";
import { moverSignupAndLogin } from "@/lib/auth";
import { handleSnsLogin, type SnsProvider } from "@/lib/api/snsAuth";
import {
  validateSignupForm,
  isFormValid,
  type SignupForm,
  type ValidationErrors,
} from "@/utils/validation";

type FormKey = "name" | "email" | "phone" | "password" | "confirmPassword";

export default function MoverSignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // 폼이 유효한지 확인하는 함수
  const isFormValidForSubmit = (): boolean => {
    const currentErrors = validateSignupForm(form);
    return isFormValid(currentErrors);
  };

  // SNS 로그인 핸들러
  const handleSnsLoginClick = (provider: SnsProvider) => {
    handleSnsLogin(provider, "mover");
  };

  // 입력 값 변경 시 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedForm = { ...form, [id]: value };
    setForm(updatedForm);

    // 실시간 유효성 검사
    const newErrors = validateSignupForm(updatedForm);
    setErrors(newErrors);
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors = validateSignupForm(form);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  // 폼 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 회원가입 후 자동 로그인
      await moverSignupAndLogin({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      // 초기 프로필 등록 페이지로 리다이렉트
      router.push("/init-profile/mover");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] p-[45px] md:bg-[#F9502E]">
      <div className="m-[40px] mx-auto flex w-full max-w-[740px] rounded-[20px] bg-[#FFFFFF] px-[40px] py-[48px]">
        <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center gap-[48px] text-[#474643]">
          {/* 상단 로고 + 안내 */}
          <div className="flex w-full max-w-[640px] flex-col justify-center gap-[8px] text-center">
            <div className="mx-auto h-[100px]">
              <img
                src="/assets/logo.svg"
                alt="무빙 로고"
                width={200}
                height={80}
              />
            </div>
            <div className="mx-auto flex flex-row gap-[8px] text-[20px]">
              <p>일반 유저라면?</p>
              <a
                href="/sign-up/customer"
                className="font-semibold text-[#F9502E] underline decoration-solid underline-offset-auto"
              >
                일반 유저 전용 페이지
              </a>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="flex w-full flex-col gap-[24px]">
            <form
              className="flex flex-col gap-[56px]"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mx-auto flex w-full flex-col gap-[32px]">
                <div className="flex flex-col gap-[16px]">
                  <SignupTextInput
                    id="name"
                    label="이름"
                    placeholder="성함을 입력해 주세요"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "border-[#FF4F64]" : ""}
                  />
                  {errors.name && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[16px]">
                  <SignupTextInput
                    id="email"
                    label="이메일"
                    placeholder="이메일을 입력해 주세요"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "border-[#FF4F64]" : ""}
                  />
                  {errors.email && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[16px]">
                  <SignupTextInput
                    id="phone"
                    label="전화번호"
                    placeholder="전화번호를 입력해 주세요"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-[#FF4F64]" : ""}
                  />
                  {errors.phone && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.phone}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[16px]">
                  <SignupTextInput
                    id="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해 주세요"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={errors.password ? "border-[#FF4F64]" : ""}
                    showPasswordToggle={true}
                  />
                  {errors.password && (
                    <p className="text-[16px] text-[#FF4F64]">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-[16px]">
                  <SignupTextInput
                    id="confirmPassword"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "border-[#FF4F64]" : ""}
                    showPasswordToggle={true}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[16px] text-[#FF4F64]">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <Buttons
                disabled={isLoading || !isFormValidForSubmit()}
                className="h-fit p-4 text-[18px] leading-[26px] font-normal"
              >
                {isLoading ? "처리중..." : "시작하기"}
              </Buttons>
            </form>

            <div className="mx-auto flex flex-row gap-[8px] text-[20px] leading-[32px] font-normal text-[#474643]">
              <p>이미 무빙 회원이신가요?</p>
              <a
                className="font-semibold text-[#F9502E] underline"
                href="/login/mover"
              >
                로그인
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="text-center text-[20px] leading-[32px] font-normal text-[#474643]">
              SNS 계정으로 간편 가입하기
            </div>
            <div className="flex flex-row gap-8">
              <SnsLoginButton
                provider="google"
                onClick={() => handleSnsLoginClick("google")}
              />
              <SnsLoginButton
                provider="kakao"
                onClick={() => handleSnsLoginClick("kakao")}
              />
              <SnsLoginButton
                provider="naver"
                onClick={() => handleSnsLoginClick("naver")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
