import {FiltersInterface, LogEntry} from "../pages/Logs.tsx";
import {getAuthToken, getRefreshToken, handleAuthorisationKeysFromHeader} from "./Auth.ts";
import {BadRequestError, InternalServerError, UnauthorizedError} from "../utility/Errors.ts";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED} from "../utility/HttpResponseCodes.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL



export async function getLogsWithFiltersFromAPI(filters: FiltersInterface): Promise<LogEntry[]> {
    const url = apiUrl + 'logEntry';
    const queryParams = '?' + buildQueryParams(filters);
    const refreshToken = getRefreshToken();
    const authToken = getAuthToken() ?? '';
    if (!refreshToken) {
        throw new Error('An unknown error occurred');
    }

    const response = await fetch(url + queryParams, {
        method: 'GET',
        headers: {
            'RefreshToken': refreshToken,
            'Authorization': authToken,
            'Content-Type': 'application/json',
        },
    });
    handleAuthorisationKeysFromHeader(response.headers);

    const logs: LogEntry[] = await response.json();

    if (!response.ok) {

        console.log(response);
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
    return logs;
}

// TODO Find a better type for the prop, to make it more generic
function buildQueryParams(filters: FiltersInterface): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            params.append(key, String(value));
        }
    });

    return params.toString();
}

