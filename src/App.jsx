import './App.css'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc} from "firebase/firestore"
import {db} from '../firebase'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged , setPersistence ,browserSessionPersistence , createUserWithEmailAndPassword} from "firebase/auth";
import { useAuthStore } from './store/useAuthStore'
import { handleSignIn } from './utils/auth/handleSignIn'
import { handleSignUp } from './utils/auth/handleSignUp'

function App() {

  // Load Redux Props
  const auth = getAuth();
  const currentUsername = useAuthStore((state) => state.currentUsername)
  const enteredEmail = useAuthStore((state) => state.enteredEmail)
  const enteredPassword = useAuthStore((state) => state.enteredPassword)
  const accessToken = useAuthStore((state) => state.accessToken)
  const uid = useAuthStore((state) => state.uid)
  const errorMessage = useAuthStore((state) => state.errorMessage)

  // Load Redux Methods
  const useSetUser = {
    setCurrentUsername : useAuthStore((state) => state.setCurrentUsername),
    setEnteredEmail : useAuthStore((state) => state.setEnteredEmail),
    setEnteredPassword :useAuthStore((state) => state.setEnteredPassword),
    setAccessToken : useAuthStore((state) => state.setAccessToken),
    setUID : useAuthStore((state) => state.setUID),
    setErrorMessage : useAuthStore((state) => state.setErrorMessage)
  }
  
  return(
    <div>
    <p>cur: {currentUsername}</p>
    {!uid && <div>
    <input className='bg-gray-300' placeholder="Email" onChange={(e) => useSetUser.setEnteredEmail(e.target.value)} value={enteredEmail} type="text" name="email" id="" />
    <input className='bg-gray-300' placeholder="Password" onChange={(e) => useSetUser.setEnteredPassword(e.target.value)} value={enteredPassword} type="password" name="email" id="" />
    <button onClick={() => handleSignIn(enteredEmail , enteredPassword , useSetUser)}>Sign In</button>
    <button onClick={() => handleSignUp(enteredEmail , enteredPassword , useSetUser)}>Sign Up</button>
    <br />
    <p>{errorMessage}</p>
    </div>}
    {uid && <p>Hello {currentUsername}</p>}
    <br />
      <DebugResetButton />
      <h1 className='text-3xl font-bold uppercase'>Shell's Kitchen</h1>
      <Leaderboard />
      <MealGrid />
      <AddMealForm />
    </div>
  )
  
  
}

export default App
