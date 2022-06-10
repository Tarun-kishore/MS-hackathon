import React,{useState} from 'react';
import axios from 'axios';
import { Accordion, Button,AccordionButton,AccordionItem,Box,AccordionIcon,AccordionPanel,Input} from '@chakra-ui/react';

const Activities = () => {
    const [event,setEvent]=useState([]);
    const [editId,setEditId]=useState(null);
    const [duration,setDuration]=useState(0);
    const [location,setLocation]=useState("");
    const [activityType,setActivityType]=useState("");
    const [address,setAddress]=useState("");
    const fetchAllActivites=async()=>{
        const {data}=await axios.get("/event/all");
        setEvent(data);
    }
    const handleActivityEdit=(id,e)=>{
        setEditId(id);
        setActivityType(e.type);
        setDuration(e.duration);
        setLocation(e.Location);
        setAddress(e.address);
    }
    const handleActivityDelete=async(id)=>{
        const res=await axios.delete(`event/${id}`);
        console.log(res);
        fetchAllActivites();
    }
    const handleActivitySave=async(id,e)=>{
        const res=await axios.put(`event/edit/${id}`,{Location:location,
            type:activityType,
            duration:duration,
            address:address});
        console.log(res);
        setEditId(null);
        fetchAllActivites();
    }
    return (
        <React.Fragment>
            <Button colorScheme='yellow' margin='5px' onClick={()=>{
                fetchAllActivites();
            }}>Upcoming</Button>
            <Button colorScheme='yellow' margin='5px' onClick={()=>{
                fetchAllActivites();
            }}>Completed</Button>
            <Accordion allowToggle>
            {
            event.map((e)=>
                <AccordionItem key={e._id}>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    {e.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {(e._id!=editId)?<div>
                        <p>
                            Begninning Date :   <span>{e.date}</span>
                        </p>
                        <p>
                            Beginning Time  :   <span>{e.startsAt}</span>
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
                            {(e.description=="")?null:e.description}
                        </p>
                        <Button margin="2px" onClick={()=>{handleActivityEdit(e._id,e)}} colorScheme='yellow' size='xs'>
                            Edit
                        </Button>
                        <Button margin="2px" onClick={()=>{handleActivityDelete(e._id)}} colorScheme='yellow' size='xs'>
                            Delete
                        </Button>
                    </div>:
                        <div>
                        <p>
                            Begninning Date :   <span>{e.date}</span>
                        </p>
                        <p>
                            Beginning Time  :   <span>{e.startsAt}</span>
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
                            {(e.description=="")?null:e.description}
                        </p>
                        <Button margin="2px" onClick={()=>{handleActivitySave(e._id,e)}} colorScheme='yellow' size='xs'>
                            Save
                        </Button>
                    </div>}
                </AccordionPanel>
            </AccordionItem>
            )
            }   
            </Accordion>
        </React.Fragment>
    )
}

export default Activities