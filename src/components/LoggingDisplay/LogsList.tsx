import {LogEntry} from "../../pages/Logs.tsx";
import {Flex, Text} from "@chakra-ui/react";

export function LogsList({logEntries}: { logEntries: LogEntry[] }) {
    if (logEntries.length === 0) {
        return (
            <Flex direction="column" alignItems={"center"}>
                <Text fontWeight={'bold'} fontSize={'lg'}>There Are no logs 😱😱😱😱</Text>
            </Flex>
        );
    }

    return (
        <ul>
            {logEntries.map((entry, index) => (
                <li key={index}>{entry.message}</li>
            ))}
        </ul>
    );
}
