import {Button, Flex, Input, InputGroup, NumberInput, NumberInputField, Select} from "@chakra-ui/react";
import React from "react";
import {FiltersInterface} from "../../pages/Logs.tsx";

export function Filters({filters, setFilters, loadLogsWithFilters}: {
    filters: FiltersInterface,
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>,
    loadLogsWithFilters: () => void
}) {
    const severityFilter = filters.severityFilter?.toLowerCase();

    function updateFilters<K extends keyof FiltersInterface>(filtersType: K, value: FiltersInterface[K] | null) {
        const newFilters = {...filters};

        newFilters[filtersType] = value;
        setFilters(newFilters);
    }


    return (
        <Flex>
            <InputGroup>

                <Input
                    placeholder="Message"
                    value={filters.messageFilter === null ? '' : filters.messageFilter}
                    onChange={(e) => updateFilters("messageFilter", e.target.value || null)}
                />

                <NumberInput
                    min={1}
                    max={500}
                    value={typeof filters.limit === "number" ? filters.limit : ""}
                    onChange={(valueAsString) => {
                        const numericValue = Number(valueAsString);
                        updateFilters("limit", (isNaN(numericValue) || numericValue === 0) ? null : numericValue);
                    }}
                >
                    <NumberInputField placeholder="Limit"/>
                </NumberInput>


                <Select
                    placeholder="Select Severity"
                    _selected={filters.severityFilter === null ? '' : filters.severityFilter}
                    onChange={(e) => updateFilters("severityFilter", e.target.value || null)}
                >
                    <option value="debug" selected={severityFilter === 'debug'}>Debug</option>
                    <option value="info" selected={severityFilter === 'info'}>Info</option>
                    <option value="notice" selected={severityFilter === 'notice'}>Notice</option>
                    <option value="warning" selected={severityFilter === 'warning'}>Warning</option>
                    <option value="error" selected={severityFilter === 'error'}>error</option>
                    <option value="critical" selected={severityFilter === 'critical'}>Critical</option>
                    <option value="alert" selected={severityFilter === 'alert'}>Alert</option>
                    <option value="emergency" selected={severityFilter === 'emergency'}>Emergency</option>
                </Select>
                <Button onClick={loadLogsWithFilters}>
                    Search
                </Button>
            </InputGroup>
        </Flex>
    );
}
