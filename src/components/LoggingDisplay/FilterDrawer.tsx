import {FiltersInterface} from "../../pages/Logs.tsx";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, Flex
} from "@chakra-ui/react";

export function FilterDrawer({isOpen, onClose, filters}: {
    isOpen: boolean,
    onClose: () => void,
    filters: FiltersInterface
}) {
    console.log(filters);
    return (
        <>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between">
                            <DrawerHeader>
                                Filters
                            </DrawerHeader>
                            test
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}