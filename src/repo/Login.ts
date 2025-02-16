const apiUrl = import.meta.env.BACKEND_URL

export interface LoginRequest {
    username: string;
    password: string;
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

    const data: unknown = await response.json();

    handleAuthorisationKeysFromHeader(response.headers)

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