export function isValidPassword(password: string, repeatedPassword: string) {
    if (password !== repeatedPassword) {
        throw new Error("Passwords do not match");
    }

    if (password.length < 8) {
        throw new Error("Password has to be at least 8 characters long");
    }

    return true;
}

