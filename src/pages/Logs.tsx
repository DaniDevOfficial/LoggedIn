import {useEffect, useState, useRef} from "react";
import {Filters} from "../components/LoggingDisplay/Filters.tsx";
import {useSearchParams} from "react-router-dom";
import {LogsList} from "../components/LoggingDisplay/LogsList.tsx";
import {getLogsWithFiltersFromAPI} from "../repo/Logs.ts";
import {Flex, Skeleton, Spinner, useToast} from "@chakra-ui/react";
import {PillTag} from "../components/ui/PillTag.tsx";

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
        id: 'test1',
        message: 'Test Message',
        severity: 'Emergency',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: null,
        userId: null,
    }, {
        id: 'test2',
        message: 'Test Message2',
        severity: 'Alert',
        request: 'someRequestBodyJSON',
        requestURL: '/api/test POST',
        response: '200 Success',
        dateTime: '2025-02-03T16:51:04.592Z',
        requestKey: null,
        userId: null,
    }, {
        id: 'tesr3',
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
        id: 'test4',
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
        id: 'test5',
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
        id: 'test6',
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
        id: 'test7',
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
        id: 'test8',
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
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const prevParamsRef = useRef<string>("");

    const toast = useToast();

    function getFiltersFromURL(): FiltersInterface {
        return {
            limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : null,
            logEntryIdFilter: searchParams.get("logEntryIdFilter") || null,
            severityFilter: searchParams.get("severityFilter") || null,
            messageFilter: searchParams.get("messageFilter") || null,
            requestFilter: searchParams.get("requestFilter") || null,
            userIdFilter: searchParams.get("userIdFilter") || null,
            requestURLFilter: searchParams.get("requestURLFilter") || null,
            responseFilter: searchParams.get("responseFilter") || null,
            lifeTimeFilter: searchParams.get("lifeTimeFilter") || null,
            requestKeyFilter: searchParams.get("requestKeyFilter") || null,
            startDateFilter: searchParams.get("startDateFilter") || null,
            endDateFilter: searchParams.get("endDateFilter") || null,
            page: searchParams.get("page") ? Number(searchParams.get("page")) : null,
            ordering: searchParams.get("ordering") || null,
        };
    }

    async function loadLogsWithFilters(filtersParams?: FiltersInterface) {
        setLoading(true)
        if (filtersParams === undefined) filtersParams = filters;
        try {
            const logEntriesFromApi = await getLogsWithFiltersFromAPI(filtersParams)
            setLogs(logEntriesFromApi)
        } catch (error) {
            toast({
                status: 'error',
                description: error.message,
                title: 'Error',
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        const filtersTmp = getFiltersFromURL()
        loadLogsWithFilters(filtersTmp)
        setFilters(filtersTmp);

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
            {loading ? (
                <Flex direction={'column'} gap={3} justifyContent="center" alignItems="center" height={'50vw'}>
                    <Skeleton
                        width={'100%'}
                        height={'18%'}
                        rounded="md"
                    />                    <Skeleton
                        width={'100%'}
                        height={'18%'}
                        rounded="md"
                    />                    <Skeleton
                        width={'100%'}
                        height={'18%'}
                        rounded="md"
                    />                    <Skeleton
                        width={'100%'}
                        height={'18%'}
                        rounded="md"
                    />
                </Flex>
            ) : (
                <LogsList logEntries={logs}/>
            )}
        </>
    );
}
