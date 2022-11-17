import './App.css'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc} from "firebase/firestore"
import {db} from '../firebase'
import MealGrid from './components/MealGrid'
import { useMealsWithVotes } from './hooks/useMealsWithVotes'
import Leaderboard from './components/Leaderboard'

function App() {

  return(
    <div>
    <button className='bg-red-300'>reset votes</button>
      <Leaderboard />
      <MealGrid />
    </div>
  )
  
  
}

export default App
