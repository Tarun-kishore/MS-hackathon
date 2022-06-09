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
    Editable
  } from '@chakra-ui/react';
  import { EditIcon,LockIcon,BellIcon } from '@chakra-ui/icons';
  import { useState,useEffect } from 'react';
  import axios from 'axios';
  export default function ProfileCard() {
    const [isEditable, setIsEditable] = useState(true);
    const [formData, setFormData] = useState({
    });
    useEffect(() => {
        try {
            axios.get("/profile",formData)
            .then((res)=>{
                setFormData(res.data);
                console.log('formdata',formData);
            })
           
            //res.data;
          } catch(err) {
            console.log(err);
          }
      },[]);
    const handleSubmit = async (e) => {
        setIsEditable(true);
        e.preventDefault()
        console.log(formData);
        try {
          const res = await axios.patch("/profile",formData);
          console.log(res);
        //   res.data;
        } catch(err) {
          console.log(err);
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