import {LoginRequest, LoginResponse} from "./Login.ts";
import {FiltersInterface, LogEntry} from "../pages/Logs.tsx";
import {BadRequestError, InternalServerError, UnauthorizedError} from "../utility/Errors.ts";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED} from "../utility/HttpResponseCodes.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL

interface IsAdmin {
    isAdmin: boolean;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
    const url = apiUrl + 'logEntry';
    const refreshToken = getRefreshToken();
    const authToken = getAuthToken() ?? '';
    if (!refreshToken) {
        throw new UnauthorizedError('Not authorized');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'RefreshToken': refreshToken,
            'Authorization': authToken,
            'Content-Type': 'application/json',
        },
    });
    handleAuthorisationKeysFromHeader(response.headers);

    const isAdmin: IsAdmin = await response.json();

    if (!response.ok) {

        if (response.status === UNAUTHORIZED) {
            throw new UnauthorizedError('Not authorized');
        }
        if (response.status === BAD_REQUEST) {
            throw new BadRequestError('Wrong data provided');
        }

        if (response.status === INTERNAL_SERVER_ERROR) {
            throw new InternalServerError("Internal server error");
        }

        throw new Error('An unexpected error occurred');
    }
    return isAdmin.isAdmin;
}


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