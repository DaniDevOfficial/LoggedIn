import {useEffect, useState} from "react";
import {isCurrentUserAdmin, voidTokens} from "../repo/Auth.ts";
import {UnauthorizedError} from "../utility/Errors.ts";
import {useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";

export function Account() {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const navigate = useNavigate();
    const toast = useToast();


    useEffect(() => {
        async function checkIfIsAdmin() {
            try {
                const isCurrentUserAdminRes = await isCurrentUserAdmin();
                setIsAdmin(isCurrentUserAdminRes);
            } catch (e) {
                if (e instanceof UnauthorizedError) {
                    voidTokens()
                    navigate('/')
                }
                toast({
                    status: 'error',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    description: e.message,
                    title: 'Error',
                })
            }
            setLoading(false);
        }

        checkIfIsAdmin();
    }, [])


    return (

        <>
            asdsadf
        </>
    );
}
