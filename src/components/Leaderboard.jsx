import React from 'react'
import { useMealsWithVotes } from '../hooks/useMealsWithVotes'
import { useAuthStore } from '../store/useAuthStore'
import LeaderboardPanel from './LeaderboardPanel'

export default function Leaderboard({familyUID}) {
  const votes = useMealsWithVotes(familyUID)

  return (
    <div className='flex flex-col'>
    <h2 className='bg-[#354c2e] text-white font-medium w-[100%] flex justify-center py-2 rounded-lg'>Voting Leaderboard</h2>
      {votes && votes.map((meal) => (
        <LeaderboardPanel meal={meal} />
      ))}
    </div>
  )
}
