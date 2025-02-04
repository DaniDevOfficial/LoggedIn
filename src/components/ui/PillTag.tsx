import { Tag, TagProps, useColorModeValue } from "@chakra-ui/react";

type TagStyle = {
    light: { bg: string; border: TagProps["borderColor"]; textColor: TagProps["color"] };
    dark: { bg: string; border: TagProps["borderColor"]; textColor: TagProps["color"] };
};

const tagStyles: Record<string, TagStyle> = {
    blue: {
        light: { bg: "rgba(59, 130, 246, 0.2)", border: "blue.500", textColor: "blue.700" },
        dark: { bg: "rgba(59, 130, 246, 0.3)", border: "blue.400", textColor: "blue.300" },
    },
    green: {
        light: { bg: "rgba(16, 185, 129, 0.2)", border: "green.500", textColor: "green.700" },
        dark: { bg: "rgba(16, 185, 129, 0.3)", border: "green.400", textColor: "green.200" },
    },
    cyan: {
        light: { bg: "rgba(6, 182, 212, 0.2)", border: "teal.500", textColor: "teal.800" },
        dark: { bg: "rgba(6, 182, 212, 0.3)", border: "teal.400", textColor: "teal.200" },
    },
    orange: {
        light: { bg: "rgba(245, 158, 11, 0.2)", border: "orange.500", textColor: "orange.700" },
        dark: { bg: "rgba(245, 158, 11, 0.3)", border: "orange.400", textColor: "orange.200" },
    },
    red: {
        light: { bg: "rgba(239, 68, 68, 0.2)", border: "red.500", textColor: "red.800" },
        dark: { bg: "rgba(239, 68, 68, 0.3)", border: "red.400", textColor: "red.200" },
    },
    purple: {
        light: { bg: "rgba(139, 92, 246, 0.2)", border: "purple.500", textColor: "purple.800" },
        dark: { bg: "rgba(139, 92, 246, 0.3)", border: "purple.400", textColor: "purple.200" },
    },
    yellow: {
        light: { bg: "rgba(234, 179, 8, 0.2)", border: "yellow.500", textColor: "yellow.700" },
        dark: { bg: "rgba(234, 179, 8, 0.3)", border: "yellow.400", textColor: "yellow.200" },
    },
    black: {
        light: { bg: "rgba(107, 114, 128, 0.2)", border: "gray.500", textColor: "gray.800" },
        dark: { bg: "rgba(46,48,54,0.3)", border: "gray.500", textColor: "gray.400" },
    },
};

export function PillTag({ content, colorScheme = "blue" }: { content: string; colorScheme?: string }) {
    const mode = useColorModeValue("light", "dark");
    const { bg, border, textColor } = tagStyles[colorScheme]?.[mode] || tagStyles.blue[mode];

    return (
        <Tag
            size="lg"
            borderRadius="full"
            bgColor={bg}
            border="2px solid"
            borderColor={border}
            color={textColor}
            fontWeight="bold"
            px={4}
            py={1}
        >
            {content}
        </Tag>
    );
}
