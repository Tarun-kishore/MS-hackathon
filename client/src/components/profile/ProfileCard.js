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
  import { useState } from 'react';
  import axios from 'axios';
  export default function ProfileCard() {
    const [isEditable, setIsEditable] = useState(true);
    const [formData, setFormData] = useState({
        name: "name ",
        DOB: "Feb 29 2009" ,//or any other format,
        mobile: "9999999999",
        email: "email@domain.com",
        password: "password",
        isStudent: false,
        school:"",
        organisation: "",
        isEmployee: false,
        Organisation: false,
        educationalBackground: "Graduate",
        occupation: "Student",
        languages: "Hindi",
        nationality: "indian",
        address:"address",
        Location: "delhi",
        availableTill: "Jun 30 2022",
        preferences: [
            {
              preference: "event management"
            },
            {
              preference : "game playing"
              }
          ],    //not needed during signup
          skills: [
            {
              skill: "content"
            },
            {
              skill : "design"
              }
          ]  //not needed during signup


    });
    const handleSubmit = (e) => {
        setIsEditable(true);
        e.preventDefault()
        console.log(formData);
        try {
      
          const res = await axios.post("/volunteer/register", {
            Locations, availableTill, preferences, skills
          });
          console.log(res);
          res.data && window.location.replace("/event");
        } catch(err) {
          console.log(err);
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
                        <Avatar
                        size={'xl'}
                        src={
                        'https://toybank.in/wp-content/themes/dharampura/images/logo.png'
                        }
                        alt={'Author'}
                    />
                        <Text>Name</Text>
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
                        value={formData.dob}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Mobile Number</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        value={formData.mobile_number}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>School</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.school}
                        onChange = {(e) => setFormData({...formData, school: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Organisation</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.organisation}
                        onChange = {(e) => setFormData({...formData, organisation: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Available Till</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.AvailableTill}
                        onChange = {(e) => setFormData({...formData, AvailableTill: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Languages</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.Languages}
                        onChange = {(e) => setFormData({...formData, Languages: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Address</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.Address}
                        onChange = {(e) => setFormData({...formData, Address: e.target.value})}
                        size='sm'
                    />
                    </Box>
                    <Box>
                    <Text mb='8px'>Skills</Text>
                    <Input
                        // value={value}
                        // onChange={handleChange}
                        defaultValue={formData.Skills}
                        onChange = {(e) => setFormData({...formData, Skills: e.target.value})}
                        isRequired='true'
                        size='sm'
                    />
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
                                  //backend se jo value ye hojayegi


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