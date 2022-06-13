import React, { useContext } from 'react'
import './signup.css'
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

import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"

export default function SignUp() {

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
    <Flex mb={25} minHeight='100vh'>

      <Box background = '#fffff7'
        // opacity={0.9}
        borderWidth={1}
        px={4}
        maxWidth='500px'
        minWidth="53%"
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
      <Heading>Sign up</Heading>
      <Text>
        <Link to="/login"><div className='link'>Already have an account? Sign in</div></Link>
      </Text>
    </Box>
  )
}

const LoginForm = () => {

  let formData = {
    name: "",
    DOB:"",
    mobile:"",
    address:"",
    email:"",
    password:"",
    educationalBackground:"",
    occupation:"",
    languages: [],
    nationality:"",
    school:"",
    organisation:""
  }

    // const [name, setName] = useState("")
    // const [DOB, setDOB] = useState("")
    // const [mobile, setMobile] = useState("")
    // const [address, setAddress] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [educationalBackground, setEducationalBackground] = useState("")
    // const [occupation, setOccupation] = useState("")
    // let [languages, setLanguages] = useState([])
    // const [nationality, setNationality] = useState("")
    // const [school, setSchool] = useState("")
    // const [organisation, setOrganisation] = useState("")
    const [error, setError] = useState(false)
    let tickedLanguages = new Set()

    const setLanguagesRequired = (value) => {
      document.getElementById("languagesForm").required = value;
    };

    useEffect(() => {
      setLanguagesRequired(true);
    }, []);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      
      try {  
        let array = Array.from(tickedLanguages);
        formData.languages = array.map((key, index) => ({ language: key }));
        console.log(formData.languages);
      
      const res = await axios.post("/signup", formData);

      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
      res.data && window.location.replace("/event");
      
    } catch(err) {
      console.log(err);
      setError(true);
    }
  }

  const handleLanguage = async (e) => {
    const language = e.target.value;
    if (e.target.checked) {
      tickedLanguages.add(language);
      setLanguagesRequired(false);
      console.log(tickedLanguages);
      console.log(language);
    } else {
      if (tickedLanguages.has(language)) {
        tickedLanguages.delete(language);
        if (tickedLanguages.size == 0) setLanguagesRequired(true);
        console.log(language, "removed");
      }
    }
  };

  return (
    <Box my={8}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input required type="text" placeholder='Enter your name'
          onChange={e => formData.name = e.target.value}
          ></Input>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Address</FormLabel>
          <Textarea required type="text" placeholder='Enter your address'
          onChange={e => formData.address = e.target.value}
          ></Textarea><br/>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Mobile Number</FormLabel>
          <Input required type="number" placeholder='Enter mobile number'
          onChange={e => formData.mobile = e.target.value}
          ></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input required type="email" placeholder='Enter Email ID'
        onChange={e => formData.email = e.target.value}
        ></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Create Password</FormLabel>
        <Input required type="password" placeholder='Enter password'
        onChange={e => formData.password = e.target.value}
        ></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Date of Birth</FormLabel>
          <Input required type="date" onChange={e => formData.DOB = e.target.value}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>In which school/college do you study?</FormLabel>
        <Input onChange={e => formData.school = e.target.value}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>In which organization/corporate do you work?</FormLabel>
        <Input onChange={e => formData.organisation = e.target.value}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Academic Qualifications</FormLabel>
        <Input required onChange={e => formData.educationalBackground = e.target.value}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Occupation</FormLabel>
        <Input onChange={e => formData.occupation = e.target.value}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Nationality</FormLabel>
        <Input onChange={e => formData.nationality = e.target.value}></Input>
        </FormControl>

        <FormControl id="languagesForm" mt={4}>
          <FormLabel>Languages you know?</FormLabel><br/>
          <Stack spacing={5} direction='column'>
          <Checkbox value="English" onChange={handleLanguage}>
              English
            </Checkbox> 
            <Checkbox value="Hindi" onChange={handleLanguage}>
              Hindi
            </Checkbox> 
            <Checkbox value="Marathi" onChange={handleLanguage}>
              Marathi
            </Checkbox> 
            <Checkbox value="Urdu" onChange={handleLanguage}>
              Urdu
            </Checkbox> 
            <Checkbox value="Gujarati" onChange={handleLanguage}>
            Gujarati
            </Checkbox> 
            <Checkbox value="Tamil" onChange={handleLanguage}>
            Tamil
            </Checkbox>
          </Stack>
        </FormControl>

        <Button type="submit" backgroundColor='#ffc900' width='full' mt={12} mb={4}>Sign up</Button>
        { error && <span >Something went wrong!</span> }
      </form>
    </Box>
  )
}
