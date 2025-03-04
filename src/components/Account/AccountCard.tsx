import {Account} from "../../repo/Account.ts";
import {Text, Flex, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

export function AccountCard({account}: {account: Account}) {

    async function deleteAccount() {
        console.log(account);
    }

    return (
        <>
            <Flex
            justifyContent="space-between"
            alignItems="center"
            >


                <Text>
                    {account.username}
                </Text>
                <IconButton
                    icon={<DeleteIcon/>}
                    colorScheme="red"
                    aria-label={""}
                    onClick={() => {
                        deleteAccount()
                    }}
                />

            </Flex>
        </>
    );
}
