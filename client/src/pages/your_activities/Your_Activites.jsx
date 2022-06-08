import Cards from '../../components/cards/Cards'
import './your_activities.css'
import {useState, useEffect} from "react"
import axios from "axios"

export default function Your_Activites() {

  return (
    <div className='your_activities'>
      <Cards/>
      </div>
  )
}
