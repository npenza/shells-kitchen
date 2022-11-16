import React from 'react'
import { useVoteStore } from '../store/useVoteStore'

export default function MealCard({meal}) {

  const voteState = useVoteStore()


  return (
    <div key={meal.id} className='meal-card col-span-1 flex justify-start flex-col my-10 bg-red-200 text-left'>
        <img src={meal.img} className="h-80 object-cover" />
        <div className='grid grid-cols-4'>
        <div className='grid col-span-3'>
          <p className='px-5 text-md font-bold'>{meal.title}</p>
          <p className='px-5 text-sm'>{meal.rating}</p>
        </div>
        <button className='bg-white rounded py-1 px-3 m-2' onClick={() => voteState.increaseVote()}>Vote</button>
        </div>
        
    </div>
  )
}
