import {LogEntry} from "../../pages/Logs.tsx";
import {Flex, Text} from "@chakra-ui/react";
import { LogCard } from "./LogCard.tsx";

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
                <LogCard key={index} logEntry={entry}/>
            ))}
        </ul>
    );
}
