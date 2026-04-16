// frontend/src/utils/validation.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhoneBD = (phone: string): boolean => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return /^01[3-9]\d{8}$/.test(cleaned);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
};