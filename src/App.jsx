import './App.css'
import MealGrid from './components/MealGrid'
import { useVoteStore } from './store/useVoteStore'
import { useQuery } from '@tanstack/react-query'
import { useState , useEffect } from 'react'

function App() {
  const voteState = useVoteStore()
  const [leaderboard , setLeaderboard ] = useState([])


  const { isLoading, error, data } = useQuery({
    queryKey: ['meals'],
    queryFn: () =>
      fetch('http://localhost:3000/meals').then(res => res.json()
      )
  })

  if (isLoading) return 'Loading Meals...'

  if (error) return 'An error has occurred: ' + error.message

    {data.map((meal) => {
      if (meal.votes > 0){
        setLeaderboard[leaderboard , meal]
      }
    })}

  

  return(
    <div>
      <div>
      <h2>Voting Leaderboard</h2>
      {leaderboard.map((meal) => (
          <p>{meal.title} - {meal.votes}</p>
        ))}
      </div>
      <MealGrid/>
    </div>
  )
  
  
}

export default App
