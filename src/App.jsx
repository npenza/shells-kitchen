import './App.css'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import Login from './components/Login'
import moment from 'moment/moment'
import { useEffect } from 'react'

function App() {


let date = moment().format('MMMM Do YYYY, h:mm:ss');;     
let resetTime = moment.constructor([2023])


  return(
    <div>
    <p>{date}</p>
    <p>resets at {resetTime}</p>
      <Login />
      <DebugResetButton />
      <h1 className='text-3xl font-bold uppercase'>Shell's Kitchen</h1>
      <Leaderboard />
      <MealGrid />
      <AddMealForm />
    </div>
  )
  
  
}

export default App
