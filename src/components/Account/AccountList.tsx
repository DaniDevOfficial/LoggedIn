import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerHeader,
    DrawerOverlay,
    Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select,
    useDisclosure
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {Account} from "../../repo/Account.ts";




export function AccountList() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function loadData(){

        }

        loadData();
    }, [])

    return (
        <>

            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between" gap={2} maxH={'80vh'} overflowY="auto">
                            <DrawerHeader>
                                Registered Accounts
                            </DrawerHeader>

                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
