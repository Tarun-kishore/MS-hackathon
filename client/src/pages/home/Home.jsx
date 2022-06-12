import './home.css'
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react'

export default function Home() {

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="homebg">
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Toybank
            </Text>
            <br />{' '}
            <Text color={'#ffc900'} as={'span'}>
            Development Through Play
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          Toybank's mindful approach to play promotes at-risk children's mental well-being
          and socio-emotional development to ensure a better perspective towards life in adulthood.

          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <a href="http://toybank.org/contact">
            <Button
              rounded={'full'}
              bg={'#ffc900'}
              color={'black'}
              _hover={{
                bg: 'yellow.500',
              }}>
              Contact Us
            </Button>
            </a>
            <Link to="/signup">
            {!user && <Button rounded={'full'}>SIGN UP</Button>}
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={3}>
        <Image
          alt={'mY Image'}
          objectFit={'repeat'}
          src={
            'https://1.bp.blogspot.com/-j4C_rCpkGEI/XfhsKgBL_yI/AAAAAAAAaPU/6KTZcK_Qg8U0RqFewAYHArsY9OXXYszYwCLcBGAsYHQ/s640/IMG_7460.jpg'
          }
        />
      </Flex>
    </Stack>
    </div>
  );
}
