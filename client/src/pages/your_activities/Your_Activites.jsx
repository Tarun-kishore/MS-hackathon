import Cards from '../../components/cards/Cards'
import './your_activities.css'
import {useState, useEffect} from "react"
import axios from "axios"

export default function Your_Activites() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get("/event/recommended");
      console.log(res);
      setCards(res.data);
    }
    fetchCards()
  }, [])

  const handleEnrolled = async (e) => {
    e.preventDefault();
    try {  
    const res = await axios.get("/volunteer/myEvents");

    console.log(res);
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
}
