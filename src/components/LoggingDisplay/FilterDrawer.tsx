import {FiltersInterface} from "../../pages/Logs.tsx";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select
} from "@chakra-ui/react";
import React from "react";

export function FilterDrawer({isOpen, onClose, filters, setFilters}: {
    isOpen: boolean,
    onClose: () => void,
    filters: FiltersInterface,
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>,
}) {
    console.log(filters);

    function updateFilters<K extends keyof FiltersInterface>(filtersType: K, value: FiltersInterface[K] | null) {
        const newFilters = {...filters};

        newFilters[filtersType] = value;
        setFilters(newFilters);
    }

    return (
        <>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between" gap={2}>
                            <DrawerHeader>
                                Filters
                            </DrawerHeader>
                            <FormControl>
                                <FormLabel>Message Filter</FormLabel>
                                <Input
                                    value={filters.messageFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('messageFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Log Entry Id Filter</FormLabel>
                                <Input
                                    value={filters.logEntryIdFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('logEntryIdFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Severity Filter</FormLabel>
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
                            </FormControl>
                            <FormControl>
                                <FormLabel>Request Filter</FormLabel>
                                <Input
                                    value={filters.requestFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('requestFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Request Url Filter</FormLabel>
                                <Input
                                    value={filters.requestURLFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('requestURLFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Response Filter</FormLabel>
                                <Input
                                    value={filters.responseFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('responseFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>User Id Filter</FormLabel>
                                <Input
                                    value={filters.userIdFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('userIdFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Request Key Filter</FormLabel>
                                <Input
                                    value={filters.requestKeyFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('requestKeyFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Limit</FormLabel>
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
                            </FormControl>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}