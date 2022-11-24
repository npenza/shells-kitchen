import React from 'react'
import { useMealsWithVotes } from '../hooks/useMealsWithVotes'
import LeaderboardPanel from './LeaderboardPanel'

export default function Leaderboard({familyUID}) {

  const votes = useMealsWithVotes(familyUID)

  return (
    <div className='flex flex-col'>
    <h2 className='bg-orange-400 text-white font-medium w-[100%] flex justify-center py-2 rounded-lg'>Voting Leaderboard</h2>
      {votes && votes.map((meal) => (
        <LeaderboardPanel meal={meal} />
      ))}
    </div>
  )
}
