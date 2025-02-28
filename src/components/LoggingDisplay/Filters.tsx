import {
    Flex,
    IconButton,
    Input,
    InputGroup,
    NumberInput,
    NumberInputField,
    Select,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {FiltersInterface} from "../../pages/Logs.tsx";
import {SearchIcon} from "@chakra-ui/icons";
import {FaFilter} from "react-icons/fa";
import {FilterDrawer} from "./FilterDrawer.tsx";

export function Filters({filters, setFilters, loadLogsWithFilters}: {
    filters: FiltersInterface,
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>,
    loadLogsWithFilters: (filterParam?: FiltersInterface) => void
}) {

    function updateFilters<K extends keyof FiltersInterface>(filtersType: K, value: FiltersInterface[K] | null) {
        const newFilters = {...filters};

        newFilters[filtersType] = value;
        setFilters(newFilters);
    }

    const {isOpen, onOpen, onClose} = useDisclosure();

    
    return (
        <Flex
            gap={2}
            justifyContent="center"
        >
            <form onSubmit={onOpen}>
                <Flex
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >

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
                        value={filters.severityFilter ?? ""}
                        onChange={(e) => updateFilters("severityFilter", e.target.value || null)}
                    >
                        <option value="debug">Debug</option>
                        <option value="info">Info</option>
                        <option value="notice">Notice</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="critical">Critical</option>
                        <option value="alert">Alert</option>
                        <option value="emergency">Emergency</option>
                    </Select>


                    <IconButton
                        aria-label="Show all filters"
                        icon={<SearchIcon/>}
                        size="sm"
                        cursor="pointer"
                        onClick={() => (loadLogsWithFilters())}
                    />
                    <IconButton
                        aria-label="Show all filters"
                        icon={<FaFilter/>}
                        onClick={() => {
                            onOpen()
                        }}
                        size="sm"
                        cursor="pointer"
                    />
                </Flex>

            </form>

            <FilterDrawer isOpen={isOpen} onClose={onClose} filters={filters} setFilters={setFilters}
                          loadLogsWithFilters={loadLogsWithFilters}/>
        </Flex>
    );
}
