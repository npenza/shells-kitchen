import React from 'react'
import { getAuth } from "firebase/auth";
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/useAuthStore'
import { handleSignIn } from '../utils/auth/handleSignIn'
import { handleSignUp } from '../utils/auth/handleSignUp'
import { handleSignOut } from '../utils/auth/handleSignOut'

const Login = () => {

  // Load Redux Props
  const currentUsername = useAuthStore((state) => state.currentUsername)
  const enteredEmail = useAuthStore((state) => state.enteredEmail)
  const enteredPassword = useAuthStore((state) => state.enteredPassword)
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
  
  // Check for persisted login
  useAuth(useSetUser)

    return (
        <>
        {!uid && <div>
        <input className='bg-gray-300' placeholder="Email" onChange={(e) => useSetUser.setEnteredEmail(e.target.value)} value={enteredEmail} type="text" name="email" id="" />
        <input className='bg-gray-300' placeholder="Password" onChange={(e) => useSetUser.setEnteredPassword(e.target.value)} value={enteredPassword} type="password" name="email" id="" />
        <button onClick={() => handleSignIn(enteredEmail , enteredPassword , useSetUser)}>Sign In</button>
        <button onClick={() => handleSignUp(enteredEmail , enteredPassword , useSetUser)}>Sign Up</button>
        <br />
        <p>{errorMessage}</p>
        </div>}
        {uid && <div>
        <p>Hello {currentUsername}</p>
        <button onClick={() => handleSignOut(useSetUser)}>Log Out</button>
        </div>}
    </>
    );
}

export default Login;


