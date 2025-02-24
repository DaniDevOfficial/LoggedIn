import {LogEntry} from "../../pages/Logs.tsx";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, Flex, FormControl, FormLabel, IconButton, Input, Text, Textarea, useClipboard, useToast
} from "@chakra-ui/react";
import {PillTag} from "../ui/PillTag.tsx";
import {severityColorMapping} from "../../utility/colorMapping.ts";
import {isJsonString} from "../../utility/json.ts";
import {CopyIcon} from "@chakra-ui/icons";

export function LogEntryDrawer({isOpen, onClose, logEntry}: {
    isOpen: boolean,
    onClose: () => void,
    logEntry: LogEntry
}) {


    return (
        <>
            <Drawer placement="right" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between">
                            <DrawerHeader paddingLeft={0}>
                                <Flex
                                    gap={5}
                                    justifyContent="space-between"
                                    flexDir={'row'}
                                >
                                    {logEntry.message ?? 'No Message' /* onclick copy */}
                                    <div>
                                        {logEntry.severity ? (
                                            <PillTag
                                                content={logEntry.severity}
                                                colorScheme={severityColorMapping[logEntry.severity.toLowerCase()] ?? ''}
                                            />
                                        ) : (
                                            <PillTag content={'Info'}/>
                                        )}
                                    </div>
                                </Flex>

                                <Text fontSize={'xs'} color={'gray.500'}>
                                    {logEntry.id ?? '' /* onclick copy */}
                                </Text>
                            </DrawerHeader>

                            {logEntry.requestUrl && (
                                <>
                                    <FormControl>
                                        <FormLabel>Request URL</FormLabel>
                                        <Input readOnly value={logEntry.requestUrl}/>
                                    </FormControl>
                                </>
                            )}

                            {logEntry.request && <FormatedJsonTextArea text={logEntry.request} title="Request" />}
                            {logEntry.response && <FormatedJsonTextArea text={logEntry.response} title="Response" />}


                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

function FormatedJsonTextArea({ text, title }: { text: string; title: string }) {
    const isJson = isJsonString(text);
    const toast = useToast();
    const { onCopy } = useClipboard(isJson ? JSON.stringify(text, null, 2) : text);

    function handleCopy() {
        onCopy();
        toast({
            status: 'success',
            description: 'Coppied to clipboard',
            title: 'Copy',
        })
    }

    return (
        <FormControl>
            <FormLabel>{title} {isJson && "(JSON)"}</FormLabel>
            <Box position="relative">
                <IconButton
                    aria-label="Copy to clipboard"
                    icon={<CopyIcon />}
                    size="sm"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={handleCopy}
                    zIndex={3}
                    cursor="pointer"
                />
                <Textarea
                    value={isJson ? JSON.stringify(text, null, 2) : text}
                    isReadOnly
                    height={isJson ? '200px' : 'auto'}
                    fontFamily={isJson ? 'monospace' : ''}
                    whiteSpace="pre-wrap"
                />
            </Box>
        </FormControl>
    );
}
