import './card.css'
import play from '../assets/play.jpeg'
import audio from '../assets/audio.jpg'
import translate from '../assets/translationbg.jpg'
import axios from 'axios'
import {useState, useEffect} from 'react'
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

export default function Card({card, bn}) {

  const message = "Your registration has not been approved by the admin yet. Please bear with us :)"
  const [pending, setPending] = useState(false)
  const [buttonName, setButtonName] = useState("")
  const [pic, setPic] = useState(`${card.type}`)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState(card.name)
  const [address, setAddress] = useState(card.address)
  const [Location, setLocation] = useState(card.Location)
  const [date, setDate] = useState(card.date)
  const [time, setTime] = useState("10 AM")
  const [duration, setDuration] = useState(card.duration)
  const [description, setDescription] = useState(card.description)

  // console.log(bn);

  useEffect(() => {
    const fetchEnrolled = async () => {

      const user = JSON.parse(localStorage.getItem('user'));
      var str = bn;
      setButtonName(str);
      // console.log(buttonName);
      // console.log(bn);

      console.log(pic)

      if(user) {
        const status = user.data.user.approval;
        console.log(user.data.user.approval);
        if(status == "pending") {
          setPending(true);
        }
      }
    }
    fetchEnrolled()
  }, [])

  const handleDetails = async(e) => {
    onOpen()
  }

    const handleEnroll = async(e) => {
        e.preventDefault();      
        console.log("heyy");  

        if(bn == "Enroll") {

          try {  
            const res = await axios.post(`/enrollment/enroll/${card._id}`, {
          });

            bn = "Unenroll"
            console.log(res);
            
          } catch(err) {
            const errorCode = err.response.status;
            // if(errorCode == "403") {
            //   setPending(true);
            // }
            console.log(err.response.status);
        }
      } else {

        try {  
          const res = await axios.post(`/enrollment/unenroll/${card._id}`, {
        });

          bn = "Enroll"
          console.log(res);
          
        } catch(err) {
          const errorCode = err.response.status;
          // if(errorCode == "403") {
          //   setPending(true);
          // }
          console.log(err.response.status);

      }
    }
  }
  
  if(card.type == "audio") {
  return (
    <div className='card'>
        <img className='cardImg' src={audio} alt="" />
        <div className='cardInfo'>
          <div className='cardCats'>
            <span className='cardCat'>{new Date(card.startsAt).toDateString()}</span>
            <span className='cardCat'>{card.location}</span>
          </div>
          <span className="cardTitle">{card.name}</span>
          <hr/>
          <div className='buttons'>
            <button className='badge fill' onClick={handleDetails}> Details </button>
            <button className='badge sec fill' onClick={handleEnroll}> {bn} </button>
            {pending && <span className='tooltiptext'>{message}</span>}
          </div>
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                  <div>{name}</div>
                  <div>Address: {address}, {Location}</div>
                  <div>Date: {new Date(date).toDateString()}</div>
                  <div>Time: {time}</div>
                  <div>Duration: {duration} Hours</div>
                  <div>Description: {description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </div>
  )} else if(card.type == "translate") {
    return (
      <div className='card'>
          <img className='cardImg' src={translate} alt="" />
          <div className='cardInfo'>
            <div className='cardCats'>
              <span className='cardCat'>{new Date(card.startsAt).toDateString()}</span>
              <span className='cardCat'>{card.location}</span>
            </div>
            <span className="cardTitle">{card.name}</span>
            <hr/>
            <div className='buttons'>
              <button className='badge fill' onClick={handleDetails}> Details </button>
              <button className='badge sec fill' onClick={handleEnroll}> {bn} </button>
              {pending && <span className='tooltiptext'>{message}</span>}
            </div>
          </div>
          <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                  <div>{name}</div>
                  <div>Address: {address}, {Location}</div>
                  <div>Date: {new Date(date).toDateString()}</div>
                  <div>Time: {time}</div>
                  <div>Duration: {duration} Hours</div>
                  <div>Description: {description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    )
  } else {
    return (
      <div className='card'>
          <img className='cardImg' src={play} alt="" />
          <div className='cardInfo'>
            <div className='cardCats'>
              <span className='cardCat'>{new Date(card.startsAt).toDateString()}</span>
              <span className='cardCat'>{card.location}</span>
            </div>
            <span className="cardTitle">{card.name}</span>
            <hr/>
            <div className='buttons'>
              <button className='badge fill' onClick={handleDetails}> Details </button>
              <button className='badge sec fill' onClick={handleEnroll}> {bn} </button>
              {pending && <span className='tooltiptext'>{message}</span>}
            </div>
          </div>
          <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                  <div>{name}</div>
                  <div>Address: {address}, {Location}</div>
                  <div>Date: {new Date(date).toDateString()}</div>
                  <div>Time: {time}</div>
                  <div>Duration: {duration} Hours</div>
                  <div>Description: {description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }
}

