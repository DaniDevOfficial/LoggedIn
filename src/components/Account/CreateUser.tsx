import {Button, Flex, FormControl, FormLabel, IconButton, Input, useToast} from "@chakra-ui/react";
import {useState} from "react";
import {BsEye} from "react-icons/bs";
import {isValidPassword} from "../../utility/password.ts";
import {useNavigate} from "react-router-dom";

export function CreateUser() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

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
                    <FormLabel>
                        Password
                    </FormLabel>
                    <Flex>

                        <Input
                            placeholder={'Password'}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <IconButton
                            icon={<BsEye/>}
                            aria-label={""}
                            onClick={() => {
                                setShowPassword(!showPassword)
                            }}
                        />
                    </Flex>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Repeat Password
                    </FormLabel>
                    <Flex>

                        <Input
                            placeholder={'Repeat Password'}
                            type={showRepeatPassword ? 'text' : 'password'}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        <IconButton
                            icon={<BsEye/>}
                            aria-label={""}
                            onClick={() => {
                                setShowRepeatPassword(!showRepeatPassword)
                            }}
                        />
                    </Flex>
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
