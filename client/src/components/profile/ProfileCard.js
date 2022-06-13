import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    VStack,
    HStack,
    SimpleGrid,
    Input,
    Grid,
    GridItem,
    Icon,
    LinkBox,
    Link,
    FormControl,
    Editable,
    FormLabel,
    Radio,
    RadioGroup,
    FormHelperText,
    Checkbox,
    Wrap,
    WrapItem,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge,
    Select
  } from '@chakra-ui/react';
  import { useToast } from '@chakra-ui/react'
  import { EditIcon,LockIcon,BellIcon } from '@chakra-ui/icons';
  import { useState,useEffect } from 'react';
  import axios from 'axios';
  import Volunteer from './Volunteer'
  export default function ProfileCard() {
    const toast = useToast()
    let ticked_languages = new Set();
    let ticked_skills = new Set();
    let ticked_locations = new Set();
    let ticked_preferences = new Set();
    
    const [isEditable, setIsEditable] = useState(true);
    const [formData, setFormData] = useState({});
    const [FeildEmpty,setFeildEmpty]=useState(false);
    let isFeildEmpty;
    useEffect(() => {

        try {
            axios.get("/profile",formData)
            .then((res)=>{
                setFormData(res.data);
                console.log("form",formData.approval);
                console.log('status',formData.approval);

            })
           
            //res.data;
          } catch(err) {
            console.log(err);
          }
        },[]);
    // useEffect(() => {
    //    handleSubmit();
    // },[FeildEmpty]);
    const handleSubmit = async (e) => {
        if(ticked_languages.size==0 || ticked_locations.size==0 || ticked_skills.size==0 || ticked_preferences.size==0){
            setFeildEmpty(true); 
        }
        else{
            setFeildEmpty(false); 
            setIsEditable(true);
            e.preventDefault()
            
            let payload = formData;
            delete payload["isAdmin"];
            delete payload["email"];
            delete payload["password"];
            delete payload["mobile"];
            
            payload.languages = Array.from(ticked_languages).map((key, index) => ({ language: key }));;
            payload.Locations = Array.from(ticked_locations).map((key, index) => ({ Location: key }));;
            payload.skills = Array.from(ticked_skills).map((key, index) => ({ skill: key }));;
            payload.preferences = Array.from(ticked_preferences).map((key, index) => ({ preference: key }));;


            console.log("payload", payload);

            console.log("ticked", ticked_languages, ticked_locations, ticked_skills,ticked_preferences);

            try {
            const res = await axios.patch("/profile",payload);
            console.log(res);
            } catch(err) {
            console.log(err);
            }
        }
        
    }
    const handleLanguage = async(e) => {

        const language = e.target.value;
        if(e.target.checked) {
            ticked_languages.add(language);
            console.log(language);
        } else {
            if(ticked_languages.has(language)) {
            ticked_languages.delete(language);
            console.log(language);
            }
        }
        
    }
    const handleLocation = async(e) => {
        const location = e.target.value;
        if(e.target.checked) {
            ticked_locations.add(location);
            console.log(location);
        } else {
            if(ticked_locations.has(location)) {
            ticked_locations.delete(location);
            console.log(location);
            }
        }
    }
    const handleSkills = async(e) => {
        const skill = e.target.value;
        if(e.target.checked) {
            ticked_skills.add(skill);
            console.log(skill);
        } else {
            if(ticked_skills.has(skill)) {
            ticked_skills.delete(skill);
            console.log(skill);
            }
        }
    }
    const handlePreference = async(e) => {

        const preference = e.target.value;
        if(e.target.checked) {
          ticked_preferences.add(preference)
          console.log(preference)
        } else {
          if(ticked_preferences.has(preference)) {
            ticked_preferences.delete(preference)
            console.log(preference)
          }
        }
      }
      const handleAvailability = async(e) => {
        let numberOfMonths = parseInt(e.target.value);
        console.log(numberOfMonths);
        let date = new Date();
        formData.availableTill = date.setMonth(date.getMonth()+numberOfMonths);
      }
    const convertUTCDateToLocalDate = (date) => {
        const date1 = new Date(date);
        let dateStr = date1.toLocaleString();
        let commaIndex = dateStr.indexOf(',');
        return date1.toLocaleString().slice(0, commaIndex);
    }
    let volunteer_props={
       name:formData.name,
       hours:formData.numberOfHours, 
    }
    return (
        <>
      <Center py={6}>
        <Box
          maxW={'1000px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Box p={6}>
            <Grid
                templateRows='repeat(2)'
                templateColumns='repeat(5, 1fr)'>
                <GridItem colSpan={1} bg='gray.100' height="auto" p={"4"} >
                    <VStack>    
                        <>
                        { formData.approval=="accepted" &&  <Badge colorScheme='green'>Accepted</Badge>}
                        { formData.approval=="pending" &&  <Badge colorScheme='yellow'>Pending</Badge>}
                        </>
                   
                            <>
                            {
                                formData.numberOfHours<=10&&
                                <Avatar
                                    size={'xl'}
                                    src={
                                    'https://thumbs.dreamstime.com/z/print-161157120.jpg'
                                    }
                                    alt={'Author'}
                                />

                            }
                            </>
                            <>
                            {
                                formData.numberOfHours>10 && formData.numberOfHours<50
                                &&
                                <Avatar
                                    size={'xl'}
                                    src={
                                    'https://thumbs.dreamstime.com/z/print-161157161.jpg'
                                    }
                                    alt={'Author'}
                                />

                            }
                            </>
                            <>
                            {
                                formData.numberOfHours>50&&
                                <Avatar
                                    size={'xl'}
                                    src={
                                    'https://thumbs.dreamstime.com/z/print-161157164.jpg'
                                    }
                                    alt={'Author'}
                                />

                            }
                            </>
                            <Text>{formData.name}
                            </Text>
                            
                    </VStack>
                    <Box mt={10}>
                        <Volunteer {...volunteer_props}/>
                        
                    </Box>
                    
                
                    
                </GridItem>
                <GridItem colSpan={4} bg='white'height="auto" p={"6"}>

                    {formData.DOB != undefined && <FormControl isDisabled={isEditable}>
                        <SimpleGrid columns={2} spacing={10}>
                            <Box>
                                <Text mb='8px'>Name</Text>
                                <Input
                                    // value={value}
                                    // onChange={handleChange}
                                    value={formData.name}
                                    size='sm'
                                />
                            </Box>
                        
                            <Box>
                                <Text mb='8px'>Date Of Birth</Text>
                                <Input
                                    // value={value}
                                    // onChange={handleChange}
                                    value={convertUTCDateToLocalDate(formData.DOB)}
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Mobile Number</Text>
                                <Input
                                    value={formData.mobile}
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Locations</Text>
                            <>
                                {
                                    isEditable==true&&
                                    <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                    {
                                    formData.Locations!=undefined && formData.Locations.map((element, idx)=>(
                                        <Text key={idx}
                                        onChange = {(e) => setFormData({...formData, Locations: e.target.value})}
                                        size='sm'
                                        fontSize='sm'
                                        p={2}
                                        bg="gray.200"
                                        borderRadius={2}
                                        textAlign="center"
                                    >{element.Location}</Text>
                                      
                                    ))
                                    }
                                    </Grid>

                                }
                                </>
                                <>
                                {
                                    isEditable==false&&
                                    <FormControl mt={4}>
                                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                        <Checkbox value="Outside Mumbai" onChange={handleLocation} size="sm">
                                        Outside Mumbai
                                        </Checkbox> 
                                        <Checkbox value="Navi Mumbai" onChange={handleLocation} size="sm">
                                        Navi Mumbai
                                        </Checkbox> 
                                        <Checkbox value="Central Zone" onChange={handleLocation} size="sm">
                                        Central Zone
                                        </Checkbox> 
                                        <Checkbox value="Western Zone" onChange={handleLocation} size="sm">
                                        Western Zone
                                        </Checkbox> 
                                        <Checkbox value="Harbour Zone" onChange={handleLocation} size="sm">
                                        Harbour Zone
                                        </Checkbox>
                                        <Checkbox value="In-Office (Mahim)" onChange={handleLocation} size="sm">
                                        In-Office (Mahim)
                                        </Checkbox>
                                        <Checkbox value="Online" onChange={handleLocation} size="sm">
                                        Online
                                        </Checkbox> 
                                        <br/>
                                    </Grid>
                                </FormControl>

                                }
                                </>
                        
                            
                            </Box>
                            
                            <Box>
                            <Text mb='8px'>School</Text>
                            <Input
                                defaultValue={formData.school}
                                onChange = {(e) => setFormData({...formData, school: e.target.value})}
                                size='sm'
                            />
                            </Box>
                            <Box>
                            <Text mb='8px'>Preferences</Text>
                            <>
                                {
                                    isEditable==true&&
                                    <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                    {
                                    formData.preferences!=undefined && formData.preferences.map((element, idx)=>(
                                        <Text key={idx}
                                        onChange = {(e) => setFormData({...formData, preferences: e.target.value})}
                                        size='sm'
                                        fontSize='sm'
                                        p={2}
                                        bg="gray.200"
                                        borderRadius={2}
                                        textAlign="center"
                                    >{element.preference}</Text>
                                      
                                    ))
                                    }
                                    </Grid>

                                }
                                </>
                                <>
                                {
                                    isEditable==false&&
                                    <FormControl mt={4}>
                                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                    <Checkbox value="Play sessions with children" onChange={handlePreference} size="sm">
                                    Play sessions with Children
                                    </Checkbox> 
                                    <Checkbox value="Toy collection and Distribution" onChange={handlePreference} size="sm">
                                    Toy collection and Distribution
                                    </Checkbox> 
                                    <Checkbox value="Inventory and Gameplay" onChange={handlePreference} size="sm">
                                    Inventory and Gameplay
                                    </Checkbox> 
                                    <Checkbox value="Research and Impact Assessments" onChange={handlePreference} size="sm" >
                                    Research and Impact Assessments
                                    </Checkbox> 
                                    <Checkbox value="Events and Fundraising" onChange={handlePreference} size="sm" >
                                    Events and Fundraising
                                    </Checkbox>
                                    <Checkbox value="Content and Design" onChange={handlePreference} size="sm">
                                    Content and Design
                                    </Checkbox> 
                                    <Checkbox value="Toybank Ambassador" onChange={handlePreference} size="sm">
                                    Toybank Ambassador
                                    </Checkbox><br/>
                                    </Grid>
                                </FormControl>

                                }
                                </>
                            </Box>
                            <Box>
                            <Text mb='8px'>Organisation</Text>
                            <Input
                                defaultValue={formData.organisation}
                                onChange = {(e) => setFormData({...formData,organisation: e.target.value})}
                                size='sm'
                            />
                            </Box>
                            <Box>
                            <Text mb='8px'>Languages</Text>
                            <>
                                {
                                    isEditable==true&&
                                    <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                                    {
                                    formData.languages!=undefined && formData.languages.map((element, idx)=>(
                                        <GridItem>
                                             <Text key={idx}
                                                onChange = {(e) => setFormData({...formData, languages: e.target.value})}
                                                size='sm'
                                                fontSize='sm'
                                                p={2}
                                                bg="gray.200"
                                                borderRadius={2}
                                                textAlign="center"
                                            >{element.language}</Text>
                                        </GridItem>
                                           
                                        
                                    ))
                                    }
                                    </Grid>

                                }
                                </>
                                <>
                                {
                                    isEditable==false&&
                                    <FormControl mt={4}>
                                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                     <Checkbox value="English" onChange={handleLanguage} size="sm"> 
                                      English
                                    </Checkbox> 
                                   <Checkbox value="Hindi" onChange={handleLanguage} size="sm">
                                        Hindi
                                 </Checkbox> 
                                  <Checkbox value="Marathi" onChange={handleLanguage} size="sm">
                                     Marathi
                                    </Checkbox> 
                                   <Checkbox value="Urdu" onChange={handleLanguage} size="sm">
                                        Urdu
                                 </Checkbox> 
                                <Checkbox value="Gujarati" onChange={handleLanguage} size="sm">
                                     Gujarati
                                    </Checkbox> 
                                    <Checkbox value="Tamil" onChange={handleLanguage} size="sm">
                                     Tamil
                                     </Checkbox>
                                    </Grid>
                                </FormControl>

                                }
                                </>
                        
                            </Box>
                            <Box>
                            <Text mb='8px'>Available Till</Text>
                            <>
                            {
                                isEditable==true&&<Input
                                    defaultValue={convertUTCDateToLocalDate(formData.availableTill)}
                                    onChange = {(e) => setFormData({...formData, availableTill: e.target.value})}
                                    size='sm'
                                />
                            }
                            {
                                isEditable==false&&<Select id="availability" name="availability" 
                                onChange={handleAvailability} size="sm">
                                  <option value="1">1 month</option>
                                  <option value="3">3 months</option>
                                  <option value="6">6 months</option>
                                </Select>
                            }
                            </>
                            
                            </Box>
                            <Box>
                            <Text mb='8px'>Skills</Text>
                            <>
                                {
                                    isEditable==true&&
                                    <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                                    {
                                    formData.skills!=undefined && formData.skills.map((element, idx)=>(
                                        <GridItem>
                                            <Text key={idx}
                                            onChange = {(e) => setFormData({...formData, skills: e.target.value})}
                                            size='sm'
                                            fontSize='sm'
                                            p={2}
                                            bg="gray.200"
                                            borderRadius={2}
                                            textAlign="center"
                                        >{element.skill}</Text>
                                        </GridItem>   
                                        
                                    ))
                                    }
                                    </Grid>

                                }
                                </>
                                <>
                                {
                                    isEditable==false&&
                                    <FormControl mt={4}>
                                    <Stack spacing={4}>
                                    <Checkbox value="Story Telling" onChange={handleSkills} size="sm">
                                        Story Telling
                                    </Checkbox> 
                                    <Checkbox value="Photography" onChange={handleSkills} size="sm">
                                        Photography
                                    </Checkbox> 
                                    <Checkbox value="Writing and Editing" onChange={handleSkills} size="sm">
                                        Writing and Editing
                                    </Checkbox> 
                                    </Stack>
                                </FormControl>

                                }
                                </>
                            
                            </Box>
                            <Box>
                            <Text mb='8px'>Address</Text>
                            <Input
                                defaultValue={formData.address}
                                onChange = {(e) => setFormData({...formData, address: e.target.value})}
                                size='sm'
                            />
                            </Box>
                            
                        <>
                                {
                                    isEditable==true&&
                                    <Box>
                                    <Button
                                        onClick={() => setIsEditable(false)}
                                        colorScheme="yellow"
                                    >Edit Details</Button>
                                    </Box>

                                }
                                </>
                                <>
                                {
                                    isEditable==false&&
                                    <HStack>
                                        <Button
                                        colorScheme="blue"
                                        onClick={function(event){ handleSubmit(event);{
                                            FeildEmpty==false && toast({
                                            title: 'Changes Saved.',
                                            status: 'success',
                                            duration: 1000,
                                            isClosable: true,
                                          })
                                        }
                                          {
                                            FeildEmpty==true && toast({
                                            title: 'Some Feilds are Empty',
                                            status: 'error',
                                            duration: 1000,
                                            isClosable: true,
                                          })
                                        }
                                        }}
                                        >Save Changes</Button>
                                
                                    <Button
                                    colorScheme="red"
                                    onClick={() => setIsEditable(true)}
                                    >Cancel</Button>
                                    </HStack>
                                }
                                </>
                                

                            
                        </SimpleGrid>
                    </FormControl>
  }
                </GridItem>
            </Grid>
          </Box>
        </Box>
      </Center>
      </>
    );
}