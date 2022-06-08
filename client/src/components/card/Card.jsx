import './card.css'
import play2learn from '../assets/play2learn.jpeg'
import { Box, Badge, Button } from '@chakra-ui/react'

export default function Card() {
  return (
    <div className='card'>
        <img className='cardImg' src={play2learn} alt="" />
        <div className='cardInfo'>
          <div className='cardCats'>
            <span className='cardCat'>7 June '22</span>
            <span className='cardCat'>Mumbai</span>
          </div>
          <span className="cardTitle">Play-2-Learn Activities</span>
          <hr/>
          <div className='buttons'>
            <button className='badge fill'> Details </button>
            <button className='badge sec fill' > Enroll </button>
          </div>
        </div>
    </div>
  )
}
