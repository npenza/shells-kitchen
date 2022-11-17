import './App.css'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc} from "firebase/firestore"
import {db} from '../firebase'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import { resetAllVotes } from './utils/resetAllVotes'
import AddMealForm from './components/AddMealForm'


function App() {

  return(
    <div>
    <button onClick={() => resetAllVotes()} className='bg-red-300'>reset votes</button>
      <h1 className='text-3xl font-bold uppercase'>Shell's Kitchen</h1>
      <Leaderboard />
      <MealGrid />
      <AddMealForm />
    </div>
  )
  
  
}

export default App
