import Card from '../card/Card'
import './cards.css'

export default function Cards({cards}) {
  return (
    <>
    <hr className='line'/>
    <div className='cards'>
        {cards.map(c=> (
            <Card card={c}/>
        ))}
    </div>
    </>
  )
}
