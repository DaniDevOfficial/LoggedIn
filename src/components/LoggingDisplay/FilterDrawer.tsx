import {FiltersInterface} from "../../pages/Logs.tsx";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select
} from "@chakra-ui/react";
import React from "react";
import {SearchIcon} from "@chakra-ui/icons";

export function FilterDrawer({isOpen, onClose, filters, setFilters, loadLogsWithFilters}: {
    isOpen: boolean,
    onClose: () => void,
    filters: FiltersInterface,
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>,
    loadLogsWithFilters: (filterParam?: FiltersInterface) => void
}) {

    function updateFilters<K extends keyof FiltersInterface>(filtersType: K, value: FiltersInterface[K] | null) {
        const newFilters = {...filters};

        newFilters[filtersType] = value;
        setFilters(newFilters);
    }

    function search() {
        loadLogsWithFilters(filters);
        onClose();
    }
    return (
        <>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between" gap={2} maxH={'80vh'} overflowY="auto">
                            <DrawerHeader>
                                Filters
                            </DrawerHeader>
                            <FormControl>
                                <FormLabel>Message Filter</FormLabel>
                                <Input
                                    placeholder={'Message'}
                                    value={filters.messageFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('messageFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Log Entry Id Filter</FormLabel>
                                <Input
                                    placeholder={'Log Entry Id'}
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
                                    placeholder={'Request'}
                                    value={filters.requestFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('requestFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Request Url Filter</FormLabel>
                                <Input
                                    placeholder={'Request Url'}
                                    value={filters.requestURLFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('requestURLFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Response Filter</FormLabel>
                                <Input
                                    placeholder={'Response'}
                                    value={filters.responseFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('responseFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>User Id Filter</FormLabel>
                                <Input
                                    placeholder={'User Id'}
                                    value={filters.userIdFilter ?? ''}
                                    onChange={(e) => {
                                        updateFilters('userIdFilter', e.target.value as string)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Request Key Filter</FormLabel>
                                <Input
                                    placeholder={'Request Key'}
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
                        <Button
                            mt={3}
                            leftIcon={<SearchIcon />}
                            colorScheme={'teal'}
                            width={'100%'}
                            onClick={() => {search()}}
                        >
                            Search
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}