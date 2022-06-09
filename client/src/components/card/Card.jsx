import './card.css'
import play2learn from '../assets/play2learn.jpeg'
import axios from 'axios'

export default function Card({card}) {

    const handleEnroll = async(e) => {
        e.preventDefault();      
        console.log("heyy");  
        try {  
          const res = await axios.post(`/enrollment/enroll/${card._id}`, {
        });

        console.log(res);
        
      } catch(err) {
        console.log(err);
    }
  }
  return (
    <div className='card'>
        <img className='cardImg' src={play2learn} alt="" />
        <div className='cardInfo'>
          <div className='cardCats'>
            <span className='cardCat'>{new Date(card.startsAt).toDateString()}</span>
            <span className='cardCat'>{card.location}</span>
          </div>
          <span className="cardTitle">{card.name}</span>
          <hr/>
          <div className='buttons'>
            <button className='badge fill'> Details </button>
            <button className='badge sec fill' onClick={handleEnroll}> Enroll </button>
          </div>
        </div>
    </div>
  )
}
