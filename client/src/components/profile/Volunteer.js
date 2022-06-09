import {
DrawerBody,
Button,
Drawer,
DrawerCloseButton,
DrawerContent,
DrawerOverlay,
DrawerHeader,
useDisclosure,
Stack,
Text,
Avatar
} from '@chakra-ui/react';
import { useState} from 'react';
export default function Volunteer(props) {
    const [badge,setBadge]=useState(0);
    const [rem,setRem]=useState(0);
    const badges = [1,2,3];
    const volunteer_hours=props.hours;
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleClick = async () => {
        if(volunteer_hours<10){
            setRem(10-volunteer_hours);
             setBadge(badges[0]);
            console.log(badge);
        }
        else if(50<10){
            rem=50-volunteer_hours;
        }
      onOpen()
    }
  
    return (
      <>
          <Button
            onClick={() => handleClick()}
            m={4}
          >Volunteering</Button>
  
        <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>You have done {volunteer_hours} hours of Volunteering</DrawerHeader>
            <DrawerBody>
              <Stack>
                  Congratulations on Your Bronze Badge
                  <>
                  {
                      props.hours<10 && <Text>For the Next badge you need to do {rem} hours of volunteering </Text>
                  }
                  </>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }