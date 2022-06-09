import Card from '../card/Card'
import './cards.css'

export default function Cards({cards}) {
  return (
    <>
       <div className='heading'>
         <span className='waste'></span>
         <span className='act'>Activities Coming Up</span>
         <span className='all'> ALL </span>
         <span className='enrol'> ENROLLED </span>
      </div>

    <hr className='line'/>
    <div className='cards'>
        {cards.map(c=> (
            <Card card={c}/>
        ))}
    </div>
    </>
  )
}
