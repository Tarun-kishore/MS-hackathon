import Cards from '../../components/cards/Cards'
import './your_activities.css'
import {useState, useEffect} from "react"
import axios from "axios"

export default function Your_Activites() {

  const [cards, setCards] = useState([]);
  // no activity
  const [nact, setNact] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get("/event/recommended");
      console.log(res.data.length);
      if(res.data.length === 0) {
        setNact(true);
      }
      setCards(res.data);
    }
    fetchCards()
  }, [])

  const handleEnrolled = async (e) => {
    e.preventDefault();
    try {  
    const res = await axios.get("/volunteer/myEvents");
    setCards(res.data);
    
  } catch(err) {
    console.log(err);
  }
}

  const handleAll = async (e) => {
      e.preventDefault();
      try {  
      const res = await axios.get("/event/recommended");

      console.log(res);
      setCards(res.data);
      
    } catch(err) {
      console.log(err);
    }
  }

  if(!nact) {
    return (
      <>
      <div className='heading'>
          <span className='waste'></span>
          <span className='act'>Activities Coming Up</span>
          <span className='all' onClick={handleAll}> ALL </span>
          <span className='enrol' onClick={handleEnrolled}> ENROLLED </span>
        </div>
      <div className='your_activities'>
        <Cards cards={cards}/>
        </div>
      </>  
    )
  } else {
    return (
      <div className="message">
        <h1 className='big'> No Activities to show</h1>
        <h3 className='small'> Have you registered for volunteering activities yet? If no, please register asap!</h3>
      </div>
    )
  }
}
