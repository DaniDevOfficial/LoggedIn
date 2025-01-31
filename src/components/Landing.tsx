import { Heading, Text } from '@chakra-ui/react'
import {Link} from "react-router-dom";

export function Landing() {

    return (
        <>
            <Heading> Hey, this Project was generated with a Vite Template</Heading>
            <Text> Nice time save and now happy hacking 🧠</Text>
            <Link to={'/logs'}>Go To the logs</Link>
        </>
    )
}