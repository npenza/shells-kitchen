import React, { useState } from 'react'
import { getAuth } from "firebase/auth";
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/useAuthStore'
import { handleSignIn } from '../utils/auth/handleSignIn'
import { handleSignUp } from '../utils/auth/handleSignUp'
import { handleSignOut } from '../utils/auth/handleSignOut'
import { useEffect} from 'react';
import { useUserDataByUID } from '../hooks/useUserDataByUID';
import DebugResetButton from './DebugResetButton';
import AsideStat from './AsideStat';
import Countdown from 'react-countdown';
import { useAllFamilyMembers } from '../hooks/useAllFamilyMembers';
import SettingModal from './Modals/SettingModal';

const Login = ({useSetUser , resultsTime}) => {

  // Load Redux Props
  const currentUsername = useAuthStore((state) => state.currentUsername)
  const currentFname = useAuthStore((state) => state.currentFname)
  const currentLname = useAuthStore((state) => state.currentLname)
  const currentUserAvatar = useAuthStore((state) => state.currentUserAvatar)
  const enteredEmail = useAuthStore((state) => state.enteredEmail)
  const enteredPassword = useAuthStore((state) => state.enteredPassword)
  const uid = useAuthStore((state) => state.uid)
  const familyUID = useAuthStore((state) => state.familyUID)
  const votes = useAuthStore((state) => state.votes)
  const errorMessage = useAuthStore((state) => state.errorMessage)
  const admin = useAuthStore((state) => state.admin)
  const SuperAdmin = useAuthStore((state) => state.SuperAdmin)

  // Check for persisted login
  useAuth(useSetUser)

  // Settings Modal
  const [settingsOpen , setSettingsOpen] = useState(false)


  const familyMembers = useAllFamilyMembers()
    return (
        <>
        {settingsOpen && <SettingModal setSettingsOpen={setSettingsOpen} useSetUser={useSetUser} />}

        {!uid && <div>
        <input className='bg-gray-300' placeholder="Email" onChange={(e) => useSetUser.setEnteredEmail(e.target.value)} value={enteredEmail} type="text" name="email" id="" />
        <input className='bg-gray-300' placeholder="Password" onChange={(e) => useSetUser.setEnteredPassword(e.target.value)} value={enteredPassword} type="password" name="email" id="" />
        <button onClick={() => handleSignIn(enteredEmail , enteredPassword , useSetUser)}>Sign In</button>
        <button onClick={() => handleSignUp(enteredEmail , enteredPassword , useSetUser)}>Sign Up</button>
        <br />
        <p>{errorMessage}</p>
        </div>}
        {uid && <div>
        <div className='grid grid-cols-3 shadow-md rounde py-2 my-3 bg-white rounded-md'>
        <div className='col-span-1 '>
          <img src={currentUserAvatar} className="aspect-square w-20 rounded-full mx-auto object-cover"/>
        </div>
        <div className='col-span-2 text-left self-center '>
          <p className='text-2xl'>Hello {currentFname}</p>
          <div className='space-x-3'>
          <button className='bg-gray-700 text-white px-3 py-1 rounded-md' onClick={() => setSettingsOpen(true)}>Settings</button>
          <button className='bg-red-700 text-white px-3 py-1 rounded-md' onClick={() => handleSignOut(useSetUser)}>Log Out</button>
          { SuperAdmin && <DebugResetButton />}
          </div>
          
        </div>
        </div>
          <AsideStat stat={votes} asideText={"Votes Remaining"} />
          <AsideStat stat={<Countdown date={resultsTime}/> } asideText={"Time Remaining"} />
          
        </div>
        }
    </>
    );
}

export default Login;


