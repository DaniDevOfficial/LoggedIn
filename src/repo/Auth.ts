import {BadRequestError, InternalServerError, UnauthorizedError} from "../utility/Errors.ts";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED} from "../utility/HttpResponseCodes.ts";
import {handleDefaultResponseAndHeaders} from "./Response.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL

interface IsAdmin {
    isAdmin: boolean;
}

export interface CreateRequest {
    username: string;
    password: string;
}

export interface CreateResponse {
    message: string;
    username: string;
}


export async function isCurrentUserAdmin(): Promise<boolean> {
    const url = apiUrl + 'auth/admin';
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

    handleDefaultResponseAndHeaders(response);

    const isAdmin: IsAdmin = await response.json();

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

export interface SimpleAuthHeaderWithJson extends Record<string, string> {
    RefreshToken: string;
    Authorization: string;
    'Content-Type': string;
}

export function getBasicAuthHeader(): SimpleAuthHeaderWithJson {
    const refreshToken = getRefreshToken();
    const authToken = getAuthToken() ?? '';
    if (!refreshToken) {
        throw new UnauthorizedError('Not authorized');
    }
    return {
        RefreshToken: refreshToken,
        Authorization: authToken,
        'Content-Type': 'application/json',
    };

}