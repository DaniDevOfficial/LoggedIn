export function handleAuthorisationKeysFromHeader(header: Headers) {
    const authHeader = header.get('Authorization');
    const refreshToken = header.get('RefreshToken');

    if (authHeader !== null) {
        localStorage.setItem('Authorization', authHeader);
    }
    if (refreshToken !== null) {
        localStorage.setItem('RefreshToken', refreshToken);
    }
}

export function voidTokens() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('RefreshToken');
}

export function getRefreshToken() {
    return localStorage.getItem('RefreshToken');
}

export function getAuthToken() {
    return localStorage.getItem('Authorization');
}