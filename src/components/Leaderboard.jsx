import React from 'react'
import { useMealsWithVotes } from '../hooks/useMealsWithVotes'

export default function Leaderboard() {

  const votes = useMealsWithVotes()

  return (
    <div>
    <h2>Voting Leaderboard</h2>
      {votes && votes.map((meal) => (
        <p>{meal.data.title} - {meal.data.votes}</p>
      ))}
    </div>
  )
}
