import {Flex, useColorMode, Text, useDisclosure} from "@chakra-ui/react";
import {LogEntry as LogEntryType} from "../../pages/Logs";
import {formatDateTime} from "../../utility/dateTime";
import {PillTag} from "../ui/PillTag.tsx";
import {LogEntryDrawer} from "./LogEntryDrawer.tsx";
import {severityColorMapping} from "../../utility/colorMapping.ts";

export function LogCard({logEntry}: { logEntry: LogEntryType }) {
    const {colorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();

    try {
        logEntry.request = JSON.parse(logEntry.request ?? '');
    } catch (e) {
        // Do nothing
    }
    if (logEntry.dateTime) {
        logEntry.dateTime = formatDateTime(logEntry.dateTime);
    }
    return (
        <>
            <LogEntryDrawer isOpen={isOpen} onClose={onClose} logEntry={logEntry}/>
            <Flex
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                p={4}
                rounded="md"
                boxShadow="md"
                cursor={'pointer'}
                onClick={() => {
                    onOpen()
                }}
                justifyContent="space-between"
            >

                <Flex
                    flexDir={'column'}
                    width={'40%'}
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
                    width={'60%'}

                >
                    {logEntry.severity ? (
                        <PillTag
                            content={logEntry.severity}
                            colorScheme={severityColorMapping[logEntry.severity.toLowerCase()] ?? ''}
                        />
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
