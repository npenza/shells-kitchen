import './App.css'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import Login from './components/Login'

function App() {

  return(
    <div>
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
