import {useEffect, useState, useRef} from "react";
import {Filters} from "../components/LoggingDisplay/Filters.tsx";
import {useSearchParams} from "react-router-dom";
import {LogsList} from "../components/LoggingDisplay/LogsList.tsx";
import {getLogsWithFiltersFromAPI} from "../repo/Logs.ts";
import {useToast} from "@chakra-ui/react";

export interface FiltersInterface {
    logEntryIdFilter: string | null;
    severityFilter: string | null;
    messageFilter: string | null;
    requestFilter: string | null;
    userIdFilter: string | null;
    requestURLFilter: string | null;
    responseFilter: string | null;
    lifeTimeFilter: string | null;
    requestKeyFilter: string | null;
    startDateFilter: string | null;
    endDateFilter: string | null;
    limit: number | null;
    page: number | null;
    ordering: string | null;
}

export interface LogEntry {
    id: string;
    message: string | null,
    severity: string | null,
    request: string | null,
    userId: string | null,
    requestURL: string | null,
    requestKey: string | null,
    response: string | null,
    dateTime: string | null,
}


const emptyFilters: FiltersInterface = {
    logEntryIdFilter: null,
    severityFilter: null,
    messageFilter: null,
    requestFilter: null,
    userIdFilter: null,
    requestURLFilter: null,
    responseFilter: null,
    lifeTimeFilter: null,
    requestKeyFilter: null,
    startDateFilter: null,
    endDateFilter: null,
    limit: null,
    page: null,
    ordering: null,
};
const testLog: LogEntry[] = [
    {
        id: 'test',
        message: 'Test Message',
        severity: 'Emergency',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: null,
        userId: null,
    }, {
        id: 'test',
        message: 'Test Message2',
        severity: 'Alert',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: null,
        userId: null,
    }, {
        id: 'test',
        message: 'Test Message3',
        severity: 'Info',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: null,
        userId: null,
    },
    {
        id: 'test',
        message: 'Test Message4',
        severity: 'Notice',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: 'requestKey2132123',
        userId: null,
    },
    {
        id: 'test',
        message: 'Test Message4',
        severity: 'Debug',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: 'requestKey2132123',
        userId: null,
    },
    {
        id: 'test',
        message: 'Test Message4',
        severity: 'Warning',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: 'requestKey2132123',
        userId: null,
    },
    {
        id: 'test',
        message: 'Test Message4',
        severity: 'Error',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: 'requestKey2132123',
        userId: null,
    },
    {
        id: 'test',
        message: 'Test Message4',
        severity: 'Critical',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: 'requestKey2132123',
        userId: null,
    },

]

export function Logs() {
    const [filters, setFilters] = useState<FiltersInterface>(emptyFilters);
    const [logs, setLogs] = useState<LogEntry[]>(testLog);
    const [searchParams, setSearchParams] = useSearchParams();
    const prevParamsRef = useRef<string>("");

    const toast = useToast();

    function getFiltersFromURL(): FiltersInterface {
        return {
            limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : null,
            logEntryIdFilter: searchParams.get("logEntryId") || null,
            severityFilter: searchParams.get("severity") || null,
            messageFilter: searchParams.get("message") || null,
            requestFilter: searchParams.get("request") || null,
            userIdFilter: searchParams.get("userId") || null,
            requestURLFilter: searchParams.get("requestURL") || null,
            responseFilter: searchParams.get("response") || null,
            lifeTimeFilter: searchParams.get("lifeTime") || null,
            requestKeyFilter: searchParams.get("requestKey") || null,
            startDateFilter: searchParams.get("startDate") || null,
            endDateFilter: searchParams.get("endDate") || null,
            page: searchParams.get("page") ? Number(searchParams.get("page")) : null,
            ordering: searchParams.get("ordering") || null,
        };
    }

    async function loadLogsWithFilters() {
        try {
            const logEntriesFromApi = await getLogsWithFiltersFromAPI(filters)
            setLogs(logEntriesFromApi)
        } catch (error) {
            toast({
                status: 'error',
                description: error.message,
                title: 'Error',
            })
        }
    }

    useEffect(() => {
        setFilters(getFiltersFromURL());
    }, []);

    useEffect(() => {
        const newParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                newParams.set(key, String(value));
            }
        });

        const newParamsString = newParams.toString();
        if (prevParamsRef.current !== newParamsString) {
            prevParamsRef.current = newParamsString;
            setSearchParams(newParams);
        }
    }, [filters]);

    return (
        <>
            <Filters filters={filters} setFilters={setFilters} loadLogsWithFilters={loadLogsWithFilters}/>
            <LogsList logEntries={logs}/>
        </>
    );
}
