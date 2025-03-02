import {Button, Flex, FormControl, FormLabel, IconButton, Input, useToast} from "@chakra-ui/react";
import {useState} from "react";
import {BsEye} from "react-icons/bs";
import {isValidPassword} from "../../utility/password.ts";
import {useNavigate} from "react-router-dom";
import {createNewClaimAccount, CreateRequest, voidTokens} from "../../repo/Auth.ts";
import {UnauthorizedError} from "../../utility/Errors.ts";
import {PasswordInput} from "../ui/PasswordInput.tsx";

export function CreateUser() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const toast = useToast();
    const navigate = useNavigate();

    async function handleSubmit() {
        if (!isValidPassword(password, repeatPassword)) {
            toast({
                status: 'warning',
                description: 'Passwords are not valid',
                title: 'Issue',
            })
            return
        }
        const createRequest: CreateRequest = {
            username: username,
            password: password,
        }

        try {
            const newUser = await createNewClaimAccount(createRequest);

            toast({
                status: 'success',
                description: 'Successfully created user ' + newUser.username,
            })

        } catch (e) {
            if (e instanceof UnauthorizedError) {
                navigate('/');
                voidTokens()
            }

            toast({
                status: 'error',
                description: e.message,
            })
            return
        }


    }

    return (
        <>
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={4}
            >
                <FormControl>
                    <FormLabel>
                        Username
                    </FormLabel>
                    <Input
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <PasswordInput password={password} setPassword={setPassword}/>
                </FormControl>
                <FormControl>
                    <PasswordInput password={repeatPassword} setPassword={setRepeatPassword}
                                   placeholder={'Repeat Password'} title={'Repeat Password'}/>
                </FormControl>
                <Button
                    onClick={handleSubmit}
                >
                    Create new Claim Account
                </Button>
            </Flex>
        </>
    );
}
