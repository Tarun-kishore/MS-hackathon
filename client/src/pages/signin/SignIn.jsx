import React from 'react'
import './signin.css'
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Textarea,
  Select,
  Checkbox, 
  CheckboxGroup
} from '@chakra-ui/react'
import {
  Link
} from "react-router-dom";
import axios from "axios"
import { useState, useRef, useContext } from 'react'

export default function SignIn() {
    return (
        <div className='signup-background'>
            <div className='wrapper'>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <LoginArea />
          </ColorModeProvider>
        </ThemeProvider>
            </div>
        </div>
      )
}

const LoginArea = () => {
  return (
    <Flex mb={25} minHeight='50vh'>

      <Box background = '#fffff7'
        // opacity={0.9}
        borderWidth={1}
        px={4}
        maxWidth='500px'
        minWidth='50%'
        borderRadius={10}
        textAlign='center'
        boxShadow='lg'
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign='center' pt={10}>
      <Heading>Login</Heading>
      <Text>
        <Link to="/signup"> <div className="link">Don't have an account? Sign up </div></Link>
      </Text>
    </Box>
  )
}

const LoginForm = () => {

  const mobileRef = useRef();
  const passwordRef = useRef();

  // const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      
      try {
      const res = await axios.post("/login", {
        mobile : mobileRef.current.value,
        password : passwordRef.current.value
      });
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res));
      // const data = JSON.parse(localStorage.getItem('user')); //forgot to close
      // console.log(data.data); mobile number is -> data.data.user.mobile
      if(res.data.user.mobile == "0000000000") {
        res.data && window.location.replace("/createEvent");
      } else {
        res.data && window.location.replace("/event");
      }
    } catch(err) {
      console.log(err);
      setError(true);
    }
  }

  return (
    <Box my={8}>
      <form onSubmit={handleSubmit}>
        <FormControl mt={4}>
        <FormLabel>Mobile Number</FormLabel>
          <Input type="number" placeholder='Enter mobile number'
          ref={mobileRef}
          ></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
          <Input type="password" placeholder='Enter password'
          ref={passwordRef}
          ></Input>
        </FormControl>

        <Button type="submit" backgroundColor='#ffc900' width='full' mt={12} mb={4} >Login</Button>
        { error && <span >Something went wrong!</span> }
      </form>
    </Box>
  )
}
