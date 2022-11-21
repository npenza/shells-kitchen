import React from 'react'
import { useMealsWithVotes } from '../hooks/useMealsWithVotes'

export default function Leaderboard({familyUID}) {

  const votes = useMealsWithVotes(familyUID)

  return (
    <div className='flex flex-col'>
    <h2 className='bg-orange-400 text-white font-medium w-[100%] flex justify-center py-2 rounded-lg'>Voting Leaderboard</h2>
      {votes && votes.map((meal) => (
        <div key={meal.id} className='grid grid-cols-5 shadow-md my-2 rounded-lg'>
        <div className='col-span-1'>
          <img className='w-20 aspect-square object-cover rounded-lg' src={meal.data.img} />
        </div>
        <div className='col-span-4 text-left pl-3 self-center'>
          <h2 className='text-xl font-medium'>{meal.data.title}</h2>
          <p>{meal.data.votes} {meal.data.votes == 1 ? "voter" : "voters"}</p>
        </div>
        </div>
      ))}
    </div>
  )
}
