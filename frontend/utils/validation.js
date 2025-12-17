/**
 * Email validation
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: emailRegex.test(email),
        error: emailRegex.test(email) ? '' : 'Please enter a valid email address'
    };
};

/**
 * Password validation
 */
export const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters' };
    }
    return { isValid: true, error: '' };
};

/**
 * Name validation
 */
export const validateName = (name) => {
    if (!name || !name.trim()) {
        return { isValid: false, error: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    return { isValid: true, error: '' };
};

/**
 * Validates all registration fields
 */
export const validateRegistration = (name, email, password) => {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    return {
        isValid: nameValidation.isValid && emailValidation.isValid && passwordValidation.isValid,
        errors: {
            name: nameValidation.error,
            email: emailValidation.error,
            password: passwordValidation.error
        }
    };
};

/**
 * Validates login fields
 */
export const validateLogin = (email, password) => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    return {
        isValid: emailValidation.isValid && passwordValidation.isValid,
        errors: {
            email: emailValidation.error,
            password: passwordValidation.error
        }
    };
};
