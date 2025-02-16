import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    useColorMode, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {BsEye} from "react-icons/bs";
import {LoginRequest, loginToAccount} from "../repo/Login.ts";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {colorMode} = useColorMode();
    const toast = useToast();
    const navigate = useNavigate();
    async function submitForm() {

        if (password === "" || username === "") {
            toast({
                status: 'warning',
                description: 'Username or password is wrong!',
                title: 'Issue',
            })
            return
        }
        const data: LoginRequest = {
            username: username,
            password: password,
        }
        try {
            const response = await loginToAccount(data)

           if (response.isClaimed) {

           } else {
               navigate('logs')
           }

        } catch (e) {
            toast({
                status: 'error',
                description: e.message,
                title: 'Error',
            })
        }
    }

    return (
        <Flex
            justifyContent="center"
            mt={'10vh'}
        >

            <Container
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                borderRadius="lg"
                padding="4"
                maxW="lg"

            >
                <Flex
                    flexDirection="column"
                    gap={'4'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <FormControl>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <Input
                            placeholder={'Username'}
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
                    <Button
                        colorScheme={"teal"}
                        onClick={submitForm}
                    >
                        Login
                    </Button>
                </Flex>
            </Container>
        </Flex>
    );
}
