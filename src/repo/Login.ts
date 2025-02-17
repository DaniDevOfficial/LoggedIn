import {getAuthToken, handleAuthorisationKeysFromHeader} from "./Auth.ts";

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
    const headers = Object.fromEntries(response.headers.entries());
    console.log("All Headers:", headers);

    console.log(response.headers.get('Authorization'));
    handleAuthorisationKeysFromHeader(response.headers)


    const data: unknown = await response.json();


    if (!response.ok) {
        if (isErrorResponse(data)) {
            throw new Error(data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }

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

    handleAuthorisationKeysFromHeader(response.headers)

    const data: unknown = await response.json();

    if (!response.ok) {
        if (isErrorResponse(data)) {
            throw new Error(data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }

    return data as LoginResponse;
}

async function checkIfIsClaimToken(token: string) {
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