import './App.css'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import Login from './components/Login'
import { useAuthStore } from './store/useAuthStore'
import {useState} from 'react'
import Signup from './components/Signup'
import { handleSignInProvider } from './utils/auth/handleSignInProvider'

function App() {

  // Load Redux Props
  const currentUsername = useAuthStore((state) => state.currentUsername)
  const currentFname = useAuthStore((state) => state.currentFname)
  const currentLname = useAuthStore((state) => state.currentLname)
  const currentUserAvatar = useAuthStore((state) => state.currentUserAvatar)
  const enteredEmail = useAuthStore((state) => state.enteredEmail)
  const enteredPassword = useAuthStore((state) => state.enteredPassword)
  const uid = useAuthStore((state) => state.uid)
  const votes = useAuthStore((state) => state.votes)
  const errorMessage = useAuthStore((state) => state.errorMessage)

  // Load Redux Methods
  const useSetUser = {
    setCurrentUsername : useAuthStore((state) => state.setCurrentUsername),
    setCurrentFname : useAuthStore((state) => state.setCurrentFname),
    setCurrentLname : useAuthStore((state) => state.setCurrentLname),
    setCurrentUserAvatar : useAuthStore((state) => state.setCurrentUserAvatar),
    setEnteredEmail : useAuthStore((state) => state.setEnteredEmail),
    setEnteredPassword :useAuthStore((state) => state.setEnteredPassword),
    setAccessToken : useAuthStore((state) => state.setAccessToken),
    setUID : useAuthStore((state) => state.setUID),
    setErrorMessage : useAuthStore((state) => state.setErrorMessage),
    setVotes : useAuthStore((state) => state.setVotes)
  }

  // Login / Sign Up modal
  const [showLogin , setShowLogin] = useState(true)
  const [showSignUp , setShowSignUp] = useState(false)

  const handleShowModal = (modalType) => {
    if(modalType === "login"){
      setShowLogin(true)
      setShowSignUp(false)
    } else if (modalType === "signup"){
      setShowLogin(false)
      setShowSignUp(true)
    }
  }

  return(
    <div>
    {/* Logged In */}
    {uid && <div>
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
    }

    {/* Not logged in */}
    {!uid && <div>
      <h1>Shell's Kitchen</h1>
      <div className='grid grid-cols-1 mx-auto justify-center my-3 w-3/12'>
        <button className='bg-gray-200 col-span-1 my-1 py-1 rounded-md' onClick={() => handleShowModal("login")}>Log In</button>
        <button className='bg-gray-200 col-span-1 my-1 py-1 rounded-md' onClick={() => handleSignInProvider(useSetUser)}>Log In With Google</button>
        <button className='bg-gray-200 col-span-1 my-1 py-1 rounded-md' onClick={() => handleShowModal("signup")}>Sign Up</button>
      </div>
      {showLogin && <Login />}
      {showSignUp && <Signup/>}
      </div>
    }
    </div>
  )
  
  
}

export default App
