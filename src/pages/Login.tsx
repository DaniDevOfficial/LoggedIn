import {
    Button, Checkbox,
    Container,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input, Text,
    useColorMode, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {BsEye} from "react-icons/bs";
import {checkAuthentication, LoginRequest, loginToAccount} from "../repo/Login.ts";
import {useNavigate} from "react-router-dom";
import {voidTokens} from "../repo/Auth.ts";
import {Loader} from "../components/ui/Loader.tsx";
import {PasswordInput} from "../components/ui/PasswordInput.tsx";

export function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isTimeBased, setIsTimeBased] = useState<boolean>(true);
    const {colorMode} = useColorMode();
    const toast = useToast();
    const navigate = useNavigate();


    async function submitForm() {

        if (password === "" || username === "") {
            toast({
                status: 'warning',
                description: 'Username or password are wrong!',
                title: 'Issue',
            })
            return
        }
        const data: LoginRequest = {
            username: username,
            password: password,
            isTimeBased: isTimeBased,
        }
        try {
            const response = await loginToAccount(data)

            if (response.isClaimed) {
                navigate("/logs");
            } else {
                navigate('/claim')
            }

        } catch (e) {

            toast({
                status: 'error',
                description: e.message,
                title: 'Error',
            })
        }
    }

    useEffect(() => {

        async function wrapper() {

            try {
                await checkAuthentication()
                navigate("/logs")
            } catch (e) {
                voidTokens()
            }
            setLoading(false);
        }

        wrapper();
    }, []);

    if (loading) {
        return  <Loader />
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
                        <PasswordInput password={password} setPassword={setPassword} />
                    </FormControl>
                    <Flex gap={2}>
                        <Text>
                            Stay Logged In
                        </Text>
                        <Checkbox
                            colorScheme={'teal'}
                            value={isTimeBased ? 1 : 0}
                            onChange={() => {
                                setIsTimeBased(!isTimeBased)
                            }}
                        />

                    </Flex>
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
