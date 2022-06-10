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
  HStack
} from '@chakra-ui/react'
import { FaTwitter ,FaFacebook} from 'react-icons/fa';
export default function Volunteer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Volunteering</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><Avatar
              size={'xl'}
              src={
              'https://thumbs.dreamstime.com/z/print-161157120.jpg'
              }
              alt={'Author'}
          /></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md">
            Congratulations On Your Bronze Badge.
          You have done 100 hours of volunteering.
            </Text>
        
         <Text>
         For the next badge you need to do 200 hours of volunteering
         </Text>
         <Text>
          Share your badge on Twitter and motivate others in helping children
          
         </Text>
         
          </ModalBody>
          <ModalFooter>
          <HStack>
            <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
              Tweet
            </Button>
            <Button onClick={onClose}>Close</Button>
          </HStack>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}