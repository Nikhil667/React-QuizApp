import React from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList({flashcard}) {

  return (
    <div className='card-grid'>
        {flashcard.map(ele => {
            return <FlashCard flash={ele} key={ele.id} />
        })}
    </div>
  )
}
