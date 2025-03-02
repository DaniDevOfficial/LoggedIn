import {UnauthorizedError} from "../utility/Errors.ts";
import {CreateRequest, CreateResponse, getAuthToken, getBasicAuthHeader, getRefreshToken} from "./Auth.ts";
import {handleDefaultResponseAndHeaders} from "./Response.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL

export async function createNewClaimAccount(createData: CreateRequest): Promise<CreateResponse> {
    const url = apiUrl + 'auth/account';
    const refreshToken = getRefreshToken();
    const authToken = getAuthToken() ?? '';
    if (!refreshToken) {
        throw new UnauthorizedError('Not authorized');
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'RefreshToken': refreshToken,
        },
        body: JSON.stringify(createData)
    });

    handleDefaultResponseAndHeaders(response);

    return await response.json();
}


export interface Account {
    username: string;
    isAdmin: boolean;
    isClaimed: boolean;
    createdAt: Date;
}

export async function getAllAccounts(): Promise<Account[]> {
    const header = getBasicAuthHeader();

    const url = apiUrl + 'user/all';
    const response = await fetch(url, {
        method: 'GET',
        headers: header,
    })

    handleDefaultResponseAndHeaders(response);

    return await response.json();


}