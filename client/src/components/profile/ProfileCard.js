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
    Checkbox
  } from '@chakra-ui/react';
  import { EditIcon,LockIcon,BellIcon } from '@chakra-ui/icons';
  import { useState,useEffect } from 'react';
  import axios from 'axios';
  export default function ProfileCard() {
    let ticked_languages = new Set();
    let ticked_skills = new Set();
    let ticked_locations = new Set();
    const [isEditable, setIsEditable] = useState(true);
    const [formData, setFormData] = useState({
    });
    useEffect(() => {
        try {
            axios.get("/profile",formData)
            .then((res)=>{
                setFormData(res.data);
            })
           
            //res.data;
          } catch(err) {
            console.log(err);
          }
      },[]);
      const handleSubmit = async (e) => {
        setIsEditable(true);
        e.preventDefault()
        
        let payload = formData;
        delete payload["isAdmin"];
        delete payload["email"];
        delete payload["password"];
        delete payload["mobile"];

        try {
          const res = await axios.patch("/profile",payload);
          console.log(res);
        } catch(err) {
          console.log(err);
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
    return (
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
            templateColumns='repeat(5, 1fr)'
            >
            <GridItem colSpan={1} bg='gray.100' height="auto" p={"4"}>
                <VStack>    
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
                        <Text>{formData.name}</Text>
                </VStack>
                <Box mt={10}>
                    <Link>
                    <HStack mb={3}>
                    <Icon as={EditIcon} />
                    <Text>Profile Details</Text>
                    </HStack>
                    </Link>
                    <Link>
                        <HStack mb={3}>
                        <Icon as={BellIcon} />
                        <Text>Notifications</Text>
                        </HStack>
                    </Link>
                    <Link>
                    <HStack>
                    <Icon as={LockIcon} />
                    <Text>Change password</Text>
                    </HStack>
                    </Link>
                    
                </Box>
                
            
                
            </GridItem>
            <GridItem colSpan={4} bg='white'height="auto" p={"6"}>
            <FormControl isDisabled={isEditable}>
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
                        value={formData.DOB}
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
                            <HStack>
                            {
                            formData.Locations!=undefined && formData.Locations.map(element=>(
                               
                                <Input
                                defaultValue={element.Location}
                                onChange = {(e) => setFormData({...formData, Locations: e.target.value})}
                                size='sm'
                            />
                                
                            ))
                            }
                             </HStack>

                        }
                        </>
                        <>
                        {
                            isEditable==false&&
                            <FormControl mt={4}>
                            <Stack spacing={5}>
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
                    <Text mb='8px'>Organisation</Text>
                    <Input
                        defaultValue={formData.organisation}
                        onChange = {(e) => setFormData({...formData,organisation: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Available Till</Text>
                    <Input
                        defaultValue={formData.availableTill}
                        onChange = {(e) => setFormData({...formData, availableTill: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Languages</Text>
                    <>
                        {
                            isEditable==true&&
                            <HStack>
                            {
                            formData.languages!=undefined && formData.languages.map(element=>(
                               
                                    <Input
                                    defaultValue={element.language}
                                    onChange = {(e) => setFormData({...formData, languages: e.target.value})}
                                    size='sm'
                                />
                                
                            ))
                            }
                             </HStack>

                        }
                        </>
                        <>
                        {
                            isEditable==false&&
                            <FormControl mt={4}>
                            <Stack spacing={4}>
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
                    <Box>
                    <Text mb='8px'>Skills</Text>
                    <>
                        {
                            isEditable==true&&
                            <HStack>
                            {
                            formData.skills!=undefined && formData.skills.map(element=>(
                            
                                    <Input
                                    defaultValue={element.skill}
                                    onChange = {(e) => setFormData({...formData, skills: e.target.value})}
                                    size='sm'
                                />
                                
                            ))
                            }
                            </HStack>

                        }
                        </>
                        <>
                        {
                            isEditable==false&&
                            <FormControl mt={4}>
                            <Stack spacing={4}>
                            <Checkbox value="Story_telling" onChange={handleSkills}>
                                Story Telling
                              </Checkbox> 
                              <Checkbox value="photography" onChange={handleSkills}>
                                Photography
                              </Checkbox> 
                              <Checkbox value="writing_editing" onChange={handleSkills}>
                                Writing and Editing
                              </Checkbox> 
                            </Stack>
                          </FormControl>

                        }
                        </>
                    
                    </Box>
                   <>
                        {
                            isEditable==true&&
                            <Box>
                            <Button
                                onClick={() => setIsEditable(false)}
                            >Edit Details</Button>
                            </Box>

                        }
                        </>
                        <>
                        {
                            isEditable==false&&
                            <HStack>
                                 <Button
                                  onClick={handleSubmit}

                            >Save Changes</Button>
                           
                            <Button
                             onClick={() => setIsEditable(true)}
                            
                            >Cancel</Button>
                             </HStack>
                            

                        }
                        </>

                    
                </SimpleGrid>
                </FormControl>
            </GridItem>
        </Grid>
          </Box>
        </Box>
      </Center>
    );
  }