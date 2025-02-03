import { Box, useColorMode } from "@chakra-ui/react";
import { LogEntry as LogEntryType } from "../../pages/Logs";
import { formatDateTime } from "../../utility/dateTime";
import { useEffect } from "react";

export function LogCard({ logEntry }: { logEntry: LogEntryType }) {
    const { colorMode } = useColorMode();

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
                <Box>
                    <Box as="span" fontWeight="bold">Log Entry ID:</Box> {logEntry.id}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Severity:</Box> {logEntry.severity}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Message:</Box> {logEntry.message}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Request:</Box> {logEntry.request}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">User ID:</Box> {logEntry.userId}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Request URL:</Box> {logEntry.requestURL}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Request Key:</Box> {logEntry.requestKey}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Response:</Box> {logEntry.response}
                </Box>
                <Box>
                    <Box as="span" fontWeight="bold">Date Time:</Box> {logEntry.dateTime}
                </Box>
            </Box>
        </>
    );
}
