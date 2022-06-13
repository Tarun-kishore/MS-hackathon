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
            <Link href="https://twitter.com/intent/tweet?text=Hello%20Everyone%20I%20have%20done%20volunteering%20for%20ToyBank!%20It%20was%20an%20amazing%20experience.%20I%20recommend%20everyone%20to%20try%20it%20out." target="_blank" style={{ textDecoration: 'none' }} >
            <Button colorScheme='twitter' leftIcon={<FaTwitter />} borderRadius={5}>
              Tweet
            </Button>
            </Link>
            <Button onClick={onClose}>Close</Button>
          </HStack>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}