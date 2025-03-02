import {getAuthToken, getRefreshToken, voidTokens} from "./Auth.ts";
import {DoNothingError} from "../utility/Errors.ts";
import {handleDefaultResponseAndHeaders} from "./Response.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL

export interface LoginRequest {
    username: string;
    password: string;
    isTimeBased: boolean;
}

export interface LoginResponse {
    isClaimed: boolean;
}

export interface ClaimRequest {
    password: string;
    isTimeBased: boolean;
}


interface ErrorResponse {
    message?: string;
}

export async function loginToAccount(loginData: LoginRequest): Promise<LoginResponse> {
    const url = apiUrl + 'auth/login';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    handleDefaultResponseAndHeaders(response);

    const data: unknown = await response.json();

    return data as LoginResponse;

}

export async function claimAccount(claimData: ClaimRequest): Promise<LoginResponse> {
    const url = apiUrl + 'auth/claim';
    const claimToken = getAuthToken();

    if (!claimToken) {
        throw new Error('No claimToken found');
    }

    const isValidToken = await checkIfIsClaimToken(claimToken);
    if (!isValidToken) {
        throw new Error('No ClaimToken found');
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': claimToken,
        },
        body: JSON.stringify(claimData),
    });

    handleDefaultResponseAndHeaders(response);

    return await response.json();
}

export async function checkIfIsClaimToken(token: string) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return false;
    }

    try {
        const claimToken = decodeBase64Json(parts[1]);
        if (claimToken.isClaimToken) {
        console.log(claimToken);
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

export async function checkAuthentication() {
    const url = apiUrl + 'auth/check';
    const refreshToken = getRefreshToken();
    const authToken = '';
    if (!refreshToken) {
        voidTokens()
        throw new DoNothingError('Not authorized');

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

}

function decodeBase64Json(base64String: string) {
    const jsonString = atob(base64String);
    return JSON.parse(jsonString);
}


function isErrorResponse(data: unknown): data is ErrorResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'message' in data
    );
}