import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerHeader,
    DrawerOverlay,
    Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, Spinner,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {Account, getAllAccounts} from "../../repo/Account.ts";
import {ForbiddenError, UnauthorizedError} from "../../utility/Errors.ts";
import {voidTokens} from "../../repo/Auth.ts";
import {useNavigate} from "react-router-dom";
import {AccountList} from "./AccountList.tsx";


export function AccountDrawer() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const toast = useToast();

    async function loadDataAndOpenDrawer() {
        onOpen();
        try {
            const accounts = await getAllAccounts();
            setAccounts(accounts);
            setLoading(false);
        } catch (error) {

            let errorMessage = 'Something went wrong';
            onClose();

            if (error instanceof UnauthorizedError) {
                voidTokens();
                errorMessage = error.message;
                navigate("/");
            }

            if (error instanceof ForbiddenError) {
                errorMessage = error.message;
            }

            toast({
                description: errorMessage,
                status: "error",

            })

        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    loadDataAndOpenDrawer();
                }}
            >
                Accounts
            </Button>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent p={4} overflowY="auto" width={'100%'}>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between" gap={2} maxH={'80vh'} overflowY="auto">
                            <DrawerHeader>
                                Registered Accounts
                            </DrawerHeader>
                            {loading ? (
                                <Spinner/>
                            ) : (
                                <AccountList accounts={accounts} onClose={onClose}/>
                            )}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
