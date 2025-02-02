import { useEffect, useState, useRef } from "react";
import { Filters } from "../components/Filters.tsx";
import { useSearchParams } from "react-router-dom";

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

export function Logs() {
    const [filters, setFilters] = useState<FiltersInterface>(emptyFilters);
    const [searchParams, setSearchParams] = useSearchParams();
    const prevParamsRef = useRef<string>("");

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
    }, [filters, setSearchParams]);

    return (
        <>
            <Filters filters={filters} setFilters={setFilters} />
            {/* <LogsTable logs={logs} /> they will get the logs when the logs reload */}
        </>
    );
}
