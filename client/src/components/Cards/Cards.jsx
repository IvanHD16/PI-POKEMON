import React from 'react'
import Card from '../Card/Card'
import "./Cards.css"

const Cards = (props) => {
  return (
    <div className='cards-cont'>
      {/* {
        props.info.map((user)=> <Card/>)
      } */}
      <Card/>
      <Card/>
    </div>
  )
}

export default Cards