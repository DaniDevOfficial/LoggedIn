import {Flex, FormLabel, IconButton, Input} from "@chakra-ui/react";
import {BsEye} from "react-icons/bs";
import {Dispatch, SetStateAction, useState} from "react";

export function PasswordInput({password, setPassword, title = 'Password', placeholder = 'Password'}: {password: string; setPassword: Dispatch<SetStateAction<string>>, title?: string, placeholder?: string}) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <FormLabel>
                {title}
            </FormLabel>
            <Flex>

                <Input
                    placeholder={placeholder}
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
        </>
    );
}
