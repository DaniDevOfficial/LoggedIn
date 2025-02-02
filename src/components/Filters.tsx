import { Flex, Input, InputGroup, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import React from "react";
import { FiltersInterface } from "../pages/Logs.tsx";

export function Filters({ filters, setFilters }: { filters: FiltersInterface, setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>> }) {

    function updateFilters<K extends keyof FiltersInterface>(filtersType: K, value: FiltersInterface[K] | null) {
        const newFilters = { ...filters };

        // ✅ Remove typeof check (not reliable for null values)
        newFilters[filtersType] = value;
        setFilters(newFilters);
    }

    return (
        <Flex>
            <InputGroup>

                <Input
                    placeholder="Message"
                    onChange={(e) => updateFilters("messageFilter", e.target.value || null)}
                />

                <NumberInput
                    min={0}
                    max={500}
                    onChange={(valueAsNumber) => updateFilters("limit", Number(valueAsNumber) || null)}
                >
                    <NumberInputField placeholder="Limit" />
                </NumberInput>

                <Select
                    placeholder="Select Severity"
                    onChange={(e) => updateFilters("severityFilter", e.target.value || null)}
                >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </Select>
            </InputGroup>
        </Flex>
    );
}
