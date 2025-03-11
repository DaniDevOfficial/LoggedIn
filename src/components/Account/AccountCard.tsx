import {Account, changeAdminRoleRepo, deleteAccountRepo} from "../../repo/Account.ts";
import {Text, Flex, IconButton, useToast, Checkbox, Input} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {ForbiddenError, UnauthorizedError} from "../../utility/Errors.ts";
import {voidTokens} from "../../repo/Auth.ts";
import {useNavigate} from "react-router-dom";

export function AccountCard({account, onClose}: { account: Account, onClose?: () => void }) {

    const navigate = useNavigate();
    const toast = useToast();
    console.log(onClose)
    async function deleteAccount() {
        try {
            await deleteAccountRepo(account.id);
        } catch (error) {
            let errorMessage = 'Something went wrong';

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

    async function changeAdminRole() {
        try {
            const res = await changeAdminRoleRepo(account.id, account.isAdmin)
            if (res) {
                account.isAdmin = res.hasRole;
            }
        } catch (error) {
            let errorMessage = 'Something went wrong';

            if (error instanceof UnauthorizedError) {
                voidTokens();
                errorMessage = error.message;
                navigate("/");
            }

            if (error instanceof ForbiddenError) {
                errorMessage = error.message;
                if (onClose !== null) {
                    onClose()
                }
            }

            toast({
                description: errorMessage,
                status: "error",

            })

        }

    }

    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                gap={4}
            >


                <Input
                    value={account.username}
                />

                <Checkbox
                    defaultChecked={account.isAdmin}
                    onChange={() => {
                        changeAdminRole()
                    }}
                />

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
