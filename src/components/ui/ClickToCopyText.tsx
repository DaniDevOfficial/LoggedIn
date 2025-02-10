import {Box, Tooltip, useClipboard} from "@chakra-ui/react";

export function ClickToCopyText({text, toolTipText = 'Click To Copy'}: { text: string, toolTipText: string }) {
    const {onCopy} = useClipboard(text);
    console.log(toolTipText)
        // TODO: Tooltip and render child component
    return (
        <>
            <Tooltip>
                <Box
                    onClick={onCopy}
                >
                    {/*  */}
                </Box>
            </Tooltip>
        </>
    );
}
