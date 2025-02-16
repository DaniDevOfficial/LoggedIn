import {handleAuthorisationKeysFromHeader} from "./Auth.ts";

const apiUrl = import.meta.env.VITE_BACKEND_URL
export interface LoginRequest {
    username: string;
    password: string;
    isTimeBased: boolean;
}

export interface LoginResponse {
    isClaimed: boolean;
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

function isErrorResponse(data: unknown): data is ErrorResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'message' in data
    );
}