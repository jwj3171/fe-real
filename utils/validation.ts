// utils/validation.ts

export type LoginForm = {
  email: string;
  password: string;
};

export type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
};

export type SignupForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type ProfileEditForm = {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
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

export const validateLoginForm = (form: LoginForm): ValidationErrors => {
  const errors: ValidationErrors = {};
  errors.email = validateEmail(form.email);
  errors.password = validatePassword(form.password);
  return errors;
};

// 현재 비밀번호 유효성 검사
export const validateCurrentPassword = (currentPassword: string): string => {
  if (!currentPassword.trim()) {
    return "현재 비밀번호를 입력해주세요";
  }
  return "";
};

// 새 비밀번호 유효성 검사
export const validateNewPassword = (newPassword: string): string => {
  if (!newPassword.trim()) {
    return "새 비밀번호를 입력해주세요";
  }
  if (newPassword.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다";
  }
  return "";
};

// 새 비밀번호 확인 유효성 검사
export const validateNewPasswordConfirm = (
  newPassword: string,
  confirmPassword: string,
): string => {
  if (!confirmPassword.trim()) {
    return "비밀번호 확인을 입력해주세요";
  }
  if (newPassword !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다";
  }
  return "";
};

// 개별 필드 유효성 검사 (실시간 검사용)
export const validateField = (
  fieldName: string,
  value: string,
  additionalData?: { newPassword?: string },
): string => {
  switch (fieldName) {
    case "name":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "phone":
      return validatePhone(value);
    case "currentPassword":
      return validateCurrentPassword(value);
    case "newPassword":
      return validateNewPassword(value);
    case "confirmPassword":
      return validateNewPasswordConfirm(
        additionalData?.newPassword || "",
        value,
      );
    default:
      return "";
  }
};

// 프로필 수정 폼 유효성 검사
export const validateProfileEditForm = (
  form: ProfileEditForm,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  errors.name = validateName(form.name);
  errors.email = validateEmail(form.email);
  errors.phone = validatePhone(form.phone);

  // 비밀번호 필드 검사 (현재 비밀번호가 입력된 경우에만)
  if (form.currentPassword.trim()) {
    errors.currentPassword = validateCurrentPassword(form.currentPassword);
    errors.newPassword = validateNewPassword(form.newPassword);
    errors.confirmPassword = validateNewPasswordConfirm(
      form.newPassword,
      form.confirmPassword,
    );
  }

  return errors;
};

// 프로필 수정 폼이 제출 가능한지 확인
export const isProfileEditFormValid = (form: ProfileEditForm): boolean => {
  // 기본 정보 유효성 검사
  const isBasicInfoValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^010\d{8}$/.test(form.phone.replace(/-/g, ""));

  // 비밀번호 필드 상태 확인
  const isPasswordFieldEmpty =
    form.currentPassword.trim() === "" &&
    form.newPassword.trim() === "" &&
    form.confirmPassword.trim() === "";

  const isPasswordFieldValid =
    form.currentPassword.trim() !== "" &&
    form.newPassword.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.newPassword.length >= 8 &&
    form.newPassword === form.confirmPassword;

  // 기본 정보가 유효하고, 비밀번호 필드가 비어있거나 유효한 경우
  return isBasicInfoValid && (isPasswordFieldEmpty || isPasswordFieldValid);
};

// 폼이 유효한지 확인
export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.values(errors).every((error) => !error);
};
