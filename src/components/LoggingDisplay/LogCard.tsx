import {Box, useColorMode} from "@chakra-ui/react";
import {LogEntry as LogEntryType} from "../../pages/Logs";
import {formatDateTime} from "../../utility/dateTime";
import {useEffect, useState} from "react";
import {PillTag} from "../ui/PillTag.tsx";

const severityColorMapping: Record<string, string> = {
    debug: 'blue',
    info: 'green',
    notice: 'cyan',
    warning: 'orange',
    error: 'red',
    critical: 'purple',
    alert: 'yellow',
    emergency: 'black'
}

export function LogCard({logEntry}: { logEntry: LogEntryType }) {
    const {colorMode} = useColorMode();
    const [colorSchemeForSeverity, setColorSchemeForSeverity] = useState<string>('');

    useEffect(() => {
        try {
            logEntry.request = JSON.parse(logEntry.request ?? '');
        } catch (e) {
            // Do nothing
        }
        if (logEntry.dateTime) {
            logEntry.dateTime = formatDateTime(logEntry.dateTime);
        }

        if (logEntry.severity) {
            setColorSchemeForSeverity(severityColorMapping[logEntry.severity.toLowerCase()] ?? '');
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
                    <PillTag content={logEntry.severity} colorScheme={colorSchemeForSeverity}/>
                )}


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
