import {Flex} from "@chakra-ui/react";
import React from "react";
import {FiltersInterface} from "../pages/Logs.tsx";

export function Filters({filters, setFilters}: {filters: FiltersInterface, setFilters:  React.Dispatch<React.SetStateAction<FiltersInterface>>}) {
    return (
        <>
            <Flex>
                {/* TODO: maybe have some filters always show and some are hidden behind a popover with which more filters can be set */}
            </Flex>
        </>
    )
}
