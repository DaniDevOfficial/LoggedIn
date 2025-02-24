import {Flex, Spinner} from "@chakra-ui/react";

export function Loader() {

    return (
        <>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={'100vw'}
                height={'100vh'}
            >
                <Spinner />
            </Flex>
        </>
    );
}
