import Cards from '../../components/cards/Cards'
import './your_activities.css'
import {useState, useEffect} from "react"
import axios from "axios"

export default function Your_Activites() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get("/event/all");
      console.log(res);
      setCards(res.data);
    }
    fetchCards()
  }, [])

  return (
    <div className='your_activities'>
      <Cards cards={cards}/>
      </div>
  )
}
