import React from 'react'
import './register.css'
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
  Link,
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
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Register() {
    return (
        <div className='back'>
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
      <Heading>Register for Volunteering Activities</Heading>
    </Box>
  )
}

const LoginForm = () => {

  const setLocationsRequired = (value) => {
    document.getElementById("locationsForm").required = value;
  };

  const setPreferencesRequired = (value) => {
    document.getElementById("preferencesForm").required = value;
  };
  const setSkillsRequired = (value) => {
    document.getElementById("skillsForm").required = value;
  };

  useEffect(() => {
    setLocationsRequired(true);
    setPreferencesRequired(true);
    setSkillsRequired(true);
  }, []);

  // let date = new Date();
  let formData = {
    Locations: [],
    availableTill: new Date().setMonth(new Date().getMonth()+1),
    preferences:[],
    skills:[]
  }

  // let [Locations, setLocations] = useState([])
  // let [availableTill, setAvailableTill] = useState("")
  // let [preferences, setPreferences] = useState([])
  // let [skills, setSkills] = useState([])
  const [error, setError] = useState(false)
  let tickedLocations = new Set()
  let tickedPreferences = new Set()
  let tickedSkills = new Set()

    
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(false);

    try {
      let arrayLocations = Array.from(tickedLocations);
      let arrayPreferences = Array.from(tickedPreferences);
      let arraySkills = Array.from(tickedSkills);
      formData.Locations = arrayLocations.map((key, index) => ({ Location: key }));
      formData.preferences = arrayPreferences.map((key, index) => ({ preference: key }));
      formData.skills = arraySkills.map((key, index) => ({ skill: key }));

      // setLocations(Locations);
      // setPreferences(preferences);
      // setSkills(skills);
      // console.log(Locations);
      // console.log(preferences);
      // console.log(skills);

    const res = await axios.post("/volunteer/register", formData);
    console.log(res);
    res.data && window.location.replace("/event");
  } catch(err) {
    console.log(err);
  }

  }

  const handleLocation = async(e) => {

    const location = e.target.value;
    if(e.target.checked) {
      tickedLocations.add(location);
      setLocationsRequired(false);
      console.log(tickedLocations);
      console.log(location)
    } else {
      if(tickedLocations.has(location)) {
        tickedLocations.delete(location)
        if (tickedLocations.size == 0) setLocationsRequired(true);
        console.log(location, "removed")
      }
    }
  }

  const handlePreference = async (e) => {
    const preference = e.target.value;
    if (e.target.checked) {
      tickedPreferences.add(preference);
      setPreferencesRequired(false);
      console.log(tickedPreferences);
      console.log(preference);
    } else {
      if (tickedPreferences.has(preference)) {
        tickedPreferences.delete(preference);
        if (tickedPreferences.size == 0) setPreferencesRequired(true);
        console.log(preference, "removed");
      }
    }
  };

  const handleSkill = async (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      tickedSkills.add(skill);
      setSkillsRequired(false);
      console.log(tickedSkills);
      console.log(skill);
    } else {
      if (tickedSkills.has(skill)) {
        tickedSkills.delete(skill);
        if (tickedSkills.size == 0) setSkillsRequired(true);
        console.log(skill, "removed");
      }
    }
  };

  const handleAvailability = async(e) => {
    let numberOfMonths = parseInt(e.target.value);
    console.log(numberOfMonths);
    let date = new Date();
    formData.availableTill = date.setMonth(date.getMonth()+numberOfMonths);
  }

  return (
    <Box my={8} textAlign='center'>
      <form onSubmit={handleSubmit}>
        <FormControl id="locationsForm">
          <FormLabel>In which Toybank location would you like to volunteer?</FormLabel><br/>
          <Stack spacing={5} direction='column'>
            <Checkbox value="Outside Mumbai" onChange={handleLocation}>
              Outside Mumbai
            </Checkbox> 
            <Checkbox value="Navi Mumbai" onChange={handleLocation}>
              Navi Mumbai
            </Checkbox> 
            <Checkbox value="Central Zone" onChange={handleLocation}>
              Central Zone
            </Checkbox> 
            <Checkbox value="Western Zone" onChange={handleLocation}>
              Western Zone
            </Checkbox> 
            <Checkbox value="Harbour Zone" onChange={handleLocation}>
              Harbour Zone
            </Checkbox>
            <Checkbox value="In-Office (Mahim)" onChange={handleLocation}>
              In-Office (Mahim)
            </Checkbox>
            <Checkbox value="Online" onChange={handleLocation}>
              Online
            </Checkbox> 
             <br/>
          </Stack>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Availability</FormLabel>
          <Select id="availability" name="availability" 
          onChange={handleAvailability}
          >
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
          </Select> <br/>
        </FormControl>

        <FormControl id="preferencesForm">
          <FormLabel>Please indicate your top Volunteering preferences:</FormLabel><br/>
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
            </Checkbox><br/>
          </Stack>
        </FormControl>

        <FormControl id="skillsForm">
          <FormLabel>Please list the relevant skills you have in these areas </FormLabel><br/>
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

        <Button type="submit" backgroundColor='#ffc900' width='full' mt={12} mb={4}>Submit</Button>
        { error && <span >Something went wrong!</span> }
      </form>
    </Box>
  )
}
