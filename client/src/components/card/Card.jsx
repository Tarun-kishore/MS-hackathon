import './card.css'
import play2learn from '../assets/play2learn.jpeg'
import axios from 'axios'
import {useState, useEffect} from 'react'
export default function Card({card, bn}) {

  const message = "Your registration has not been approved by the admin yet. Please bear with us :)"
  const [pending, setPending] = useState(false)
  const [buttonName, setButtonName] = useState("");

  // console.log(bn);

  useEffect(() => {
    const fetchEnrolled = async () => {

      const user = JSON.parse(localStorage.getItem('user'));
      var str = bn;
      setButtonName(str);
      console.log(buttonName);
      console.log(bn);

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
            <button className='badge sec fill' onClick={handleEnroll}> {bn} </button>
            {pending && <span className='tooltiptext'>{message}</span>}
          </div>
        </div>
    </div>
  )
}

