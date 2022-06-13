import React,{useState} from 'react';
import axios from 'axios';
import './activities.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Heading,Text, Flex,Accordion, Button,AccordionButton,AccordionItem,Box,AccordionIcon,AccordionPanel,Input,Grid,GridItem,Alert,AlertTitle,AlertIcon, AlertDescription, Spacer, HStack} from '@chakra-ui/react';

const Activities = () => {
    const [event,setEvent]=useState([]);
    const [editId,setEditId]=useState(null);
    const [duration,setDuration]=useState(0);
    const [location,setLocation]=useState("");
    const [activityType,setActivityType]=useState("");
    const [address,setAddress]=useState("");
    const [noVolunteersReq,setNoVolunteersReq]=useState(0);
    const [timePeriod,setTimePeriod]=useState(false);
    const [completed,setCompleted]=useState(false);
    const [upcoming,setUpcoming]=useState(false);
    const[eventDate,setEventDate]=useState('');
    const [eventTime,setEventTime]=useState('');
    const [queryStartDate,setQueryStartDate]=useState(new Date());
    const [queryEndDate,setQueryEndDate]=useState(new Date());
    const fetchAllActivites=async(s)=>{
        let p=new Date('August 19, 1975 23:15:30 GMT+00:00');
        let f=new Date('August 19, 2050 23:15:30 GMT+00:00');
        let c=new Date();
        if(s=='completed'){
            const {data}=await axios.post('/admin/events', {
                startDate: p,
                endDate: c
              })
            console.log(data);
            setEvent(data);
        }else if(s=='timePeriod'){
            const {data}=await axios.post('/admin/events', {
                startDate: queryStartDate,
                endDate: queryEndDate
              })
              setEvent(data);
        }else{
            const {data}=await axios.post('/admin/events', {
                startDate: c,
                endDate: f
            })
            setEvent(data);
        }
    }
    const decideButton=()=>{
        let s="upcoming";
        if(completed==true){
            s="completed"
        }else if(timePeriod==true){
            s="timePeriod";
        }
        return s;
    }
    const handleActivityEdit=(id,e)=>{
        setEditId(id);
        setActivityType(e.type);
        setDuration(e.duration);
        setLocation(e.Location);
        setAddress(e.address);
        setNoVolunteersReq(e.volunteersRequired);
        let v=new Date(e.date);
        setEventDate(v);
        let x=new Date(e.startsAt);
        setEventTime(x);
    }
    const handleActivityDelete=async(id,s)=>{
        const res=await axios.delete(`event/${id}`);
        console.log(res);
        fetchAllActivites(s);

    }
    const handleActivitySave=async(id,e,s)=>{
        const res=await axios.put(`event/edit/${id}`,{Location:location,
            type:activityType,
            duration:duration,
            address:address,
            volunteersRequired:noVolunteersReq,
            date:eventDate,
            startsAt:eventTime});
        console.log(res);
        setEditId(null);
        fetchAllActivites(s);
    }

    const handleActivityCopy=async(id,e,s) => {
        const res=await axios.get(`event/copy/${id}`);
        console.log(res);
        fetchAllActivites(s);
    }


    const getTime=(d)=>{
        let v=new Date(d);
        return v.toLocaleTimeString('en-US');
    }
    const getDate=(d)=>{
        let v=new Date(d);
        return v.toLocaleDateString('pt-PT')
    }
    return (
        <React.Fragment>
            <div className='adminbg'>
            <Grid  h='100vh'
            templateRows='repeat(3, 3fr)'
            templateColumns='repeat(12, 1fr)'
            columnGap={1}
           >
            <GridItem colSpan={2} rowSpan={3} bg="yellow.400" area={'nav'} >
            <div>
            <Button colorScheme='yellow' width="full" mb={2} onClick={()=>{
                setTimePeriod(false)
                setUpcoming(true)
                setCompleted(false)
                fetchAllActivites('upcoming');
            }}>Upcoming</Button>
            </div>
            <div>
            <Button colorScheme='yellow' width="full"  mb={2} onClick={()=>{
                setTimePeriod(false)
                setCompleted(true)
                setUpcoming(false)
                fetchAllActivites('completed');
            }}>Completed</Button>
            </div>
            <div>
            <Button colorScheme='yellow' width="full"  mb={2} onClick={()=>{
                setTimePeriod(true)
                setCompleted(false)
                setUpcoming(false)
                fetchAllActivites('timePeriod');
            }}>Filter activities</Button>
            </div>
            </GridItem>
            <GridItem colSpan={10}>
            {(timePeriod)&&<div>
                <Box margin={5}>
                <DatePicker selected={queryStartDate} onChange={(date) => setQueryStartDate(date)} />
                </Box>
                <Box margin={5} marginBottom={0}>
                <DatePicker selected={queryEndDate} onChange={(date) => setQueryEndDate(date)} />
                </Box>
                <Box >
                <Button colorScheme='yellow' margin='5vh'  onClick={()=>{
                    setTimePeriod(true)
                    fetchAllActivites('timePeriod')
                   
                }}  size='xs' >Submit</Button>
                </Box>
            </div>}
            <Accordion allowToggle>
            {
            event.map((e)=>
                <AccordionItem key={e._id}>
                <h2>
                <AccordionButton>
                    <HStack width="full">
                    <Text >{e.name}</Text>
                    <Spacer/>
                {(e.volunteersRequired>e.volunteersEnrolled)?
                            <Box textAlign='left'>
                            <Alert status='error'>
                                <AlertIcon/>
                                <AlertTitle width="180px">Volunteers Needed</AlertTitle>
                            </Alert>
                            </Box>
                        :
                        <Box textAlign='left'>
                        <Alert status='success'>
                            <AlertIcon/>
                            <AlertTitle width="180px">Sufficient Volunteers</AlertTitle>
                        </Alert>
                        </Box>
                      }
                    </HStack>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {(e._id!=editId)?<div>
                        <p>
                            Begninning Date :   <span>{getDate(e.date)}</span>
                        </p>
                        <p>
                            Beginning Time  :   <span>{getTime(e.startsAt)}</span>
                        </p>
                        <p>
                            Activity Duration:  <span>{e.duration}</span>
                        </p>
                        <p>
                            Location         :   <span>{e.Location}</span>
                        </p>
                        <p>
                            Type of Activity :  <span>{e.type}</span>
                        </p>
                        <p>
                            Address          :  <span>{e.address}</span>
                        </p>
                        <p>
                            Volunteers Required          :  <span>{e.volunteersRequired}</span>
                        </p>
                        <p>
                            Volunteers Enrolled          :  <span>{e.volunteersEnrolled}</span>
                        </p>
                        <p>
                            {(e.description=="")?null:e.description}
                        </p>
                        <Button margin="2px" onClick={()=>{handleActivityEdit(e._id,e)}} colorScheme='yellow' size='xs'>
                            Edit
                        </Button>
                        <Button margin="2px" onClick={()=>{handleActivityDelete(e._id,decideButton())}} colorScheme='yellow' size='xs'>
                            Cancel
                        </Button>
                        <Button margin="2px" onClick={()=>{handleActivityCopy(e._id,decideButton())}} colorScheme='yellow' size='xs'>
                            Copy
                        </Button>
                    </div>:
                        <div>
                        <p>
                            Begninning Date :   <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} />
                        </p>
                        <p>
                            Beginning Time  :   <DatePicker selected={eventTime} onChange={(date) => setEventTime(date)} />
                        </p>
                        <p>
                            Activity Duration:  <span><Input variant='flushed' value={duration} onChange={(Event)=>{setDuration(Event.target.value)}} /></span>
                        </p>
                        <p>
                            Location         :   <span><Input variant='flushed' value={location} onChange={(Event)=>{setLocation(Event.target.value)}}/></span>
                        </p>
                        <p>
                            Type of Activity :  <span><Input variant='flushed' value={activityType} onChange={(Event)=>{setActivityType(Event.target.value)}}/></span>
                        </p>
                        <p>
                            Address          :  <span><Input variant='flushed' value={address} onChange={(Event)=>{setAddress(Event.target.value)}}/></span>
                        </p>
                        <p>
                            Volunteer Required          :  <span><Input variant='flushed' value={noVolunteersReq} onChange={(Event)=>{setNoVolunteersReq(Event.target.value)}}/></span>
                        </p>
                        <p>
                            Volunteers Enrolled          :  <span>{e.volunteersEnrolled}</span>
                        </p>
                        <p>
                            {(e.description=="")?null:e.description}
                        </p>
                        <Button margin="2px" onClick={()=>{handleActivitySave(e._id,e,decideButton())}} colorScheme='yellow' size='xs'>
                            Save
                        </Button>
                    </div>}
                </AccordionPanel>
            </AccordionItem>
            )
            }   
            </Accordion>
            </GridItem>
            </Grid>
            </div>
        </React.Fragment>
    )
}

export default Activities