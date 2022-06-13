import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Text,
  Icon,
  HStack,
  Link
} from '@chakra-ui/react'
import { FaTwitter ,FaFacebook, FaMedal} from 'react-icons/fa';
import { useEffect } from 'react';
export default function Volunteer(props) {
  let name=props.name;
  let hours=props.hours;
  let rem=0;
  if(hours<10){
    rem=10-hours;
  }
  else if(hours<50){
    rem=50-hours;
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="https://platform.twitter.com/widgets.js"
    script.async = true;
    // script.charset="UTF-8";
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Volunteering Hours</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
            <Avatar
              size={'xl'}
              src={
              'https://thumbs.dreamstime.com/z/print-161157120.jpg'
              }
              alt={'Author'}
          />
          <Text p="5" fontSize="xl">{name}</Text>
          </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md">
            Congratulations {name} on Your Bronze Badge!!
          You have done {hours} hours of volunteering.
            </Text>
        
         <Text>
         To Unlock next badge you need to do {rem} more hours of volunteering
         
         </Text>
         <Text>
          Share your badge on Twitter and motivate others in helping children and joining this noble cause!
          
         </Text>
         
          </ModalBody>
          <ModalFooter>
          <HStack>
            <a 
            target="blank"
            href="https://twitter.com/intent/tweet?screen_name=TwitterDev&ref_src=twsrc%5Etfw" 
            class="twitter-mention-button" data-text="Hello! Everyone I have done volunteering through" 
            data-related="Toybank"
            data-lang="en" 
            data-show-count="true"><Button colorScheme='twitter' leftIcon={<FaTwitter />}>
            Tweet
          </Button></a>
            <Button onClick={onClose}>Close</Button>
          </HStack>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


