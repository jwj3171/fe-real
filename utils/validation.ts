// utils/validation.ts

export type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export type SignupForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

// 이메일 유효성 검사
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "이메일을 입력해주세요";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "올바른 이메일 형식을 입력해주세요";
  }
  return "";
};

// 전화번호 유효성 검사
export const validatePhone = (phone: string): string => {
  if (!phone.trim()) {
    return "전화번호를 입력해주세요";
  }
  if (!/^010\d{8}$/.test(phone.replace(/-/g, ""))) {
    return "올바른 전화번호 형식을 입력해주세요 (01012345678)";
  }
  return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return "비밀번호를 입력해주세요";
  }
  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다";
  }
  return "";
};

// 비밀번호 확인 유효성 검사
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (!confirmPassword.trim()) {
    return "비밀번호 확인을 입력해주세요";
  }
  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다";
  }
  return "";
};

// 이름 유효성 검사
export const validateName = (name: string): string => {
  if (!name.trim()) {
    return "이름을 입력해주세요";
  }
  return "";
};

// 전체 폼 유효성 검사
export const validateSignupForm = (form: SignupForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  errors.name = validateName(form.name);
  errors.email = validateEmail(form.email);
  errors.phone = validatePhone(form.phone);
  errors.password = validatePassword(form.password);
  errors.confirmPassword = validateConfirmPassword(
    form.password,
    form.confirmPassword,
  );

  return errors;
};

// 폼이 유효한지 확인
export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.values(errors).every((error) => !error);
};
