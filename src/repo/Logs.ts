import {FiltersInterface, LogEntry} from "../pages/Logs.tsx";
import {getAuthToken, getRefreshToken} from "./Auth.ts";
import {UnauthorizedError} from "../utility/Errors.ts";
import {handleDefaultResponseAndHeaders} from "./Response.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL



export async function getLogsWithFiltersFromAPI(filters: FiltersInterface): Promise<LogEntry[]> {
    const url = apiUrl + 'logEntry';
    const queryParams = '?' + buildQueryParams(filters);
    const refreshToken = getRefreshToken();
    const authToken = getAuthToken() ?? '';
    if (!refreshToken) {
        throw new UnauthorizedError('Not authorized');
    }

    const response = await fetch(url + queryParams, {
        method: 'GET',
        headers: {
            'RefreshToken': refreshToken,
            'Authorization': authToken,
            'Content-Type': 'application/json',
        },
    });

    handleDefaultResponseAndHeaders(response);

    return await response.json();
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

