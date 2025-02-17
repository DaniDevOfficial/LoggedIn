import {FiltersInterface, LogEntry} from "../pages/Logs.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const apiUrl = import.meta.env.VITE_BACKEND_URL



export async function getLogsWithFiltersFromAPI(filters: FiltersInterface): Promise<LogEntry[]> {
    const url = apiUrl + 'logEntry';
    const queryParams = '?' + buildQueryParams(filters);
    const response = await fetch(url + queryParams, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const logs: LogEntry[] = await response.json();

    if (!response.ok) {
        throw new Error('Error getting logs with the response');
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

