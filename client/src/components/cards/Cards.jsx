import Card from '../card/Card'
import './cards.css'

export default function Cards({cards, bn}) {

  return (
    <>
    <div className='cards'>
        {cards.map(c=> (
            <Card card={c} bn={bn}/>
        ))}
    </div>
    </>
  )
}
