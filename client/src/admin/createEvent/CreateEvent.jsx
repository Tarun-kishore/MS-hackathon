import React, { useContext } from 'react'
import './createEvent.css'
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
  CheckboxGroup,
  Radio,
  RadioGroup
} from '@chakra-ui/react'

import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from "axios"

export default function CreateEvent() {

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
      <Heading>Create Event</Heading>
    </Box>
  )
}

const LoginForm = () => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [Location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [startsAt, setStartsAt] = useState("")
    const [address, setAddress] = useState("")
    const [volunteersRequired, setVolunteersRequired] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    let [languages, setLanguages] = useState([])
    let [preferences, setPreferences] = useState([])
    let [skills, setSkills] = useState([])
    const [error, setError] = useState(false)
    let tickedPreferences = new Set()
    let tickedSkills = new Set()
    let tickedLanguages = new Set()

    const handleSkill = async(e) => {
        const skill = e.target.value;
        if(e.target.checked) {
          tickedSkills.add(skill)
          console.log(skill)
        } else {
          if(tickedSkills.has(skill)) {
            tickedSkills.delete(skill)
            console.log(skill)
          }
        }
      }

    const handleSubmit = async (e) => {

      console.log("Hello");

      e.preventDefault();
      setError(false);
      setErrorMessage("");
      
      try {  
        let arrayLanguages = Array.from(tickedLanguages);
        let arrayPreferences = Array.from(tickedPreferences);
        let arraySkills = Array.from(tickedSkills);
        languages = arrayLanguages.map((key, index) => ({ languages: key }));
        preferences = arrayPreferences.map((key, index) => ({ preference: key }));
        skills = arraySkills.map((key, index) => ({ skill: key }));

        if(preferences.length == 0) {
            setError(true);
            return;
        }

        setLanguages(languages);
        setPreferences(preferences);
        setSkills(skills);
        console.log(languages);
        console.log(preferences);
        console.log(skills);

      const res = await axios.post("/event/add", {
        name, type, description, Location, date, startsAt, volunteersRequired, 
        preferences, skillsRequired : skills, duration, languages, address
      });

      console.log(res);
      // localStorage.setItem('user', JSON.stringify(res));
      // res.data && window.location.replace("/event");
      
    } catch(err) {
      console.log(err);
      setError(true);
      setErrorMessage(err);
    }
  }

  const handlePreference = async(e) => {

    const preference = e.target.value;
    if(e.target.checked) {
      tickedPreferences.add(preference)
      console.log(preference)
    } else {
      if(tickedPreferences.has(preference)) {
        tickedPreferences.delete(preference)
        console.log(preference)
      }
    }
  }

  const handleLanguage = async(e) => {

    const language = e.target.value;
    if(e.target.checked) {
      tickedLanguages.add(language)
      console.log(language)
    } else {
      if(tickedLanguages.has(language)) {
        tickedLanguages.delete(language)
        console.log(language)
      }
    }
  }

  return (
    <Box my={8}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input required type="text" placeholder='Name of activity'
          onChange={e => setName(e.target.value)}
          ></Input>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Activity Type</FormLabel>
          <Select required onChange={e => setType(e.target.value)}>
            <option value="Play Sessions">Play Sessions</option>
            <option value="Translation of Play to Learn Sheets">Translation of Play to Learn Sheets</option>
            <option value="Creation of Audio Instructions">Creation of Audio Instructions</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Location</FormLabel>
          <Select required onChange={e => setLocation(e.target.value)}>
            <option value="Online">Online</option>
            <option value="Outside Mumbai">Outside Mumbai</option>
            <option value="Navi Mumbai">Navi Mumbai</option>
            <option value="Central Zone">Central Zone</option>
            <option value="Western Zone">Western Zone</option>
            <option value="Harbour Zone">Harbour Zone</option>
            <option value="In-Office (Mahim)">In-Office (Mahim)</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Address</FormLabel>
        <Input required type="text" onChange={e => setAddress(e.target.value)}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Date</FormLabel>
        <Input required type="date" onChange={e => setDate(e.target.value)}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Begin Time</FormLabel>
        <Input type="date" onChange={e => setStartsAt(e.target.value)}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Duration (In hours)</FormLabel>
        <Input type="number" onChange={e => setDuration(e.target.value)}></Input>
        </FormControl>

        <FormControl mt={4}>
        <FormLabel>Number of Volunteers Required</FormLabel>
        <Input required type="number" onChange={e => setVolunteersRequired(e.target.value)}></Input>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Language skills desired in - </FormLabel><br/>
          <Stack spacing={5} direction='column'>
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

        <FormControl mt={5}>
          <FormLabel>What is the activity closest to?</FormLabel><br/>
          <Stack spacing={5} direction='column'>
            <Checkbox value="Play sessions with children" onChange={handlePreference}>
              Play sessions with Children
            </Checkbox> 
            <Checkbox value="Toy collection and Distribution" onChange={handlePreference}>
              Toy collection and Distribution
            </Checkbox> 
            <Checkbox value="Inventory and Gameplay" onChange={handlePreference}>
              Inventory and Gameplay
            </Checkbox> 
            <Checkbox value="Research and Impact Assessments" onChange={handlePreference}>
            Research and Impact Assessments
            </Checkbox> 
            <Checkbox value="Events and Fundraising" onChange={handlePreference}>
              Events and Fundraising
            </Checkbox>
            <Checkbox value="Content and Design" onChange={handlePreference}>
            Content and Design
            </Checkbox> 
            <Checkbox value="Toybank Ambassador" onChange={handlePreference}>
            Toybank Ambassador
            </Checkbox>
          </Stack>
        </FormControl>

        <FormControl mt={5}>
          <FormLabel>Skills desired </FormLabel><br/>
          <Stack spacing={5} direction='column'>
            <Checkbox value="Story Telling" onChange={handleSkill}>
              Story Telling
            </Checkbox> 
            <Checkbox value="Photography" onChange={handleSkill}>
              Photography
            </Checkbox> 
            <Checkbox value="Writing and Editing" onChange={handleSkill}>
              Writing and Editing
            </Checkbox> 
          </Stack>
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Description (Important information like actual address etc)</FormLabel>
          <Textarea type="text"
          onChange={e => setDescription(e.target.value)}
          ></Textarea><br/>
        </FormControl>

        <Button type="submit" backgroundColor='#ffc900' width='full' mt={12} mb={4}>Create Event</Button>
        { error && <span>{errorMessage}</span> }
      </form>
    </Box>
  )
}
