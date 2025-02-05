import {Box, Flex, useColorMode, Text} from "@chakra-ui/react";
import {LogEntry as LogEntryType} from "../../pages/Logs";
import {formatDateTime} from "../../utility/dateTime";
import {useEffect} from "react";
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
            <Flex
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                p={4}
                rounded="md"
                boxShadow="md"
                my={4}
                cursor={'pointer'}
                onClick={() => {console.log(123)}}
                justifyContent="space-between"
            >
                <Flex
                    flexDir={'column'}
                >
                    <Text>
                        {logEntry.message ?? 'No Message'}
                    </Text>
                    <Text fontSize={'smaller'} color={'gray.500'}>
                        {logEntry.dateTime}
                    </Text>
                </Flex>
                <Flex
                    flexDir={'column'}
                    align={'end'}
                >
                    {logEntry.severity ? (
                        <PillTag content={logEntry.severity}
                                 colorScheme={severityColorMapping[logEntry.severity.toLowerCase()] ?? ''}/>
                    ) : (
                        <PillTag content={'Info'}/>
                    )}
                    <Text fontSize={'smaller'} color={'gray.500'}>
                        {logEntry.id ?? ''}
                    </Text>
                </Flex>
            </Flex>
        </>
    );
}
