import {Box, useColorMode} from "@chakra-ui/react";
import {LogEntry as LogEntryType} from "../../pages/Logs";
import {formatDateTime} from "../../utility/dateTime";
import {useEffect} from "react";
import {PillTag} from "../ui/PillTag.tsx";

export function LogCard({logEntry}: { logEntry: LogEntryType }) {
    const {colorMode} = useColorMode();

    useEffect(() => {
        try {
            logEntry.request = JSON.parse(logEntry.request ?? '');
        } catch (e) {
            // Do nothing
        }
        if (logEntry.dateTime) {
            logEntry.dateTime = formatDateTime(logEntry.dateTime);
        }
    }, []);

    return (
        <>
            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                p={4}
                rounded="md"
                boxShadow="md"
                my={4}
            >
                {logEntry.severity && (
                    <PillTag content={logEntry.severity}/>
                )}
                <PillTag content={'test'} colorScheme={'green'}/>
                <PillTag content={'test'} colorScheme={'cyan'}/>
                <PillTag content={'test'} colorScheme={'orange'}/>
                <PillTag content={'test'} colorScheme={'red'}/>
                <PillTag content={'test'} colorScheme={'purple'}/>
                <PillTag content={'test'} colorScheme={'yellow'}/>
                <PillTag content={'test'} colorScheme={'black'}/>

                <Box>

                    <Box as="span" fontWeight="bold">Severity:</Box> {logEntry.severity}
                </Box>
                <Box>

                    <Box as="span" fontWeight="bold">Message:</Box> {logEntry.message}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Date Time:</Box> {logEntry.dateTime}
                </Box>
            </Box>
        </>
    );
}
