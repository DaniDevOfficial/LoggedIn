import {
    Button, Checkbox,
    Container,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input, Spinner, Text,
    useColorMode, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {BsEye} from "react-icons/bs";
import {
    checkAuthentication,
    checkIfIsClaimToken,
    claimAccount,
    ClaimRequest,
    LoginRequest,
    loginToAccount
} from "../repo/Login.ts";
import {useNavigate} from "react-router-dom";
import {getAuthToken, voidTokens} from "../repo/Auth.ts";
import {Loader} from "../components/ui/Loader.tsx";
import {isValidPassword} from "../utility/password.ts";
import {PasswordInput} from "../components/ui/PasswordInput.tsx";


export function Claim() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTimeBased, setIsTimeBased] = useState<boolean>(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const {colorMode} = useColorMode();
    const toast = useToast();
    const navigate = useNavigate();

    async function submitForm() {
        try {
            if (!isValidPassword(password, repeatPassword)) {
                toast({
                    status: 'warning',
                    description: 'Passwords are not valid',
                    title: 'Issue',
                })
                return
            }
        } catch (e) {
            toast({
                status: 'warning',
                description: e.message,
                title: 'Issue',
            })
            return
        }

        const data: ClaimRequest = {
            password: password,
            isTimeBased: false,
        }

        try {
            const response = await claimAccount(data)

        } catch (e) {
            toast({
                status: 'error',
                description: e.message,
                title: 'Error',
            })
        }
    }


    useEffect(() => {
        async function checkForClaimToken() {

            const claimToken = getAuthToken();

            if (!claimToken) {
                navigate('/')
                toast({
                    status: 'error',
                    description: 'No claim token',
                    title: 'Error',
                })
                return;
            }

            try {
                await checkAuthentication()
                navigate('/logs');
                return;
            } catch (e) {
                //do nothing
            }

            const isValidToken = await checkIfIsClaimToken(claimToken);
            if (!isValidToken) {
                voidTokens();
                navigate('/');
                toast({
                    status: 'error',
                    description: 'No claim token',
                    title: 'Error',
                })
                return;
            }
            setLoading(false);
        }


        checkForClaimToken();
    }, []);

    if (loading) {
        return <Loader/>
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
                        <PasswordInput password={password} setPassword={setPassword}/>

                    </FormControl>
                    <FormControl>
                        <PasswordInput password={repeatPassword} setPassword={setRepeatPassword}
                                       placeholder={'Repeat Password'} title={'Repeat Password'}/>
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
                        Claim Account
                    </Button>
                </Flex>
            </Container>
        </Flex>
    );
}
