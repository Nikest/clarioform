export type ValidationReturn = string[];
export type Validator = (value: string) => ValidationReturn;

export const validateEmail = (email: string): ValidationReturn  => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? [] : ["This email doesn't look right"];
};

export const validatePassword = (password: string): ValidationReturn => {
    const errors: Set<string> = new Set();

    if (password.length < 8) {
        errors.add("At least 8 characters long (no spaces)");
    }

    if (password.length > 64) {
        errors.add("At least 8 characters long (no spaces)");
    }

    if (/\s/.test(password)) {
        errors.add("At least 8 characters long (no spaces)");
    }

    if (!/[A-Z]/.test(password)) {
        errors.add("Uppercase and lowercase letters");
    }

    if (!/[a-z]/.test(password)) {
        errors.add("Uppercase and lowercase letters");
    }

    if (!/\d/.test(password)) {
        errors.add("At least one digit");
    }

    return Array.from(errors);
};