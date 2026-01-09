export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  phone?: string;
  role?: string;
}

export const validateUserForm = (data: any, isUpdate: boolean = false): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name || !validateName(data.name)) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!isUpdate || data.password) {
    if (!data.password || !validatePassword(data.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (data.password !== data.password_confirmation) {
      errors.password_confirmation = 'Las contraseñas no coinciden';
    }
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Teléfono inválido';
  }

  if (!data.role || !['admin', 'user'].includes(data.role)) {
    errors.role = 'Rol inválido';
  }

  return errors;
};

