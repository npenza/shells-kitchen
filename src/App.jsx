import './App.css'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import Login from './components/Login'

function App() {

  return(
    <div>
      <h1 className='text-3xl font-bold uppercase'>Shell's Kitchen</h1>
      <div className='grid grid-cols-12 space-x-5'>
      <div className='col-span-12 md:col-span-3'>
      <Login />
      <Leaderboard />
      </div>
      <div className='col-span-12 md:col-span-9 ml-0 md:ml-5'>
      <MealGrid />
      </div>
      </div>
      <AddMealForm />
    </div>
  )
  
  
}

export default App
