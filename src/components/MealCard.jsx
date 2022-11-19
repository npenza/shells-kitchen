import React from 'react'
import { handleVote } from '../utils/handleVote'
import { useAuthStore } from '../store/useAuthStore'

export default function MealCard({meal , id}) {

    // Load Redux Props
    const uid = useAuthStore((state) => state.uid)

    // Load Redux Methods
    const setVotes = useAuthStore((state) => state.setVotes)
 
  return (
    <div key={meal.id} className='meal-card col-span-1 flex justify-start flex-col my-10 bg-red-200 text-left'>
        <img src={meal.img} className="h-80 object-cover" />
        <div className='grid grid-cols-4'>
        <div className='grid col-span-3'>
          <p className='px-5 text-md font-bold'>{meal.title}</p>
          <p className='px-5 text-sm'>{meal.rating}</p>
        </div>
        <button onClick={() => handleVote(meal , id , setVotes , uid)} className='bg-white rounded py-1 px-3 m-2'>Vote</button>
        </div>
    </div>
  )
}
