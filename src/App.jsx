import './App.css'
import MealGrid from './components/MealGrid'
import Leaderboard from './components/Leaderboard'
import AddMealForm from './components/AddMealForm'
import DebugResetButton from './components/DebugResetButton'
import Login from './components/Login'
import { useAuthStore } from './store/useAuthStore'
import {useEffect, useState} from 'react'
import Signup from './components/Signup'
import { handleSignInProvider } from './utils/auth/handleSignInProvider'
import { doc, updateDoc , getDoc, limit } from 'firebase/firestore'
import { db } from '../firebase'
import { useAllFamilyMembers } from './hooks/useAllFamilyMembers'
import FamilyAside from './components/FamilyAside'
import FamilyMembersAside from './components/FamilyMembersAside'
import { Toaster } from 'react-hot-toast'
function App() {

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
  const loading = useAuthStore((state) => state.loading)

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
    setFamilyUID : useAuthStore((state) => state.setFamilyUID),
    setErrorMessage : useAuthStore((state) => state.setErrorMessage),
    setVotes : useAuthStore((state) => state.setVotes),
    setLoading : useAuthStore((state) => state.setLoading),
    setAdmin : useAuthStore((state) => state.setAdmin),
    setSuperAdmin : useAuthStore((state) => state.setSuperAdmin),
    setMealVotedFor : useAuthStore((state) => state.setMealVotedFor)
  }

  // Time & Voting
  const [votingPeriod , setVotingPeriod] = useState(false)

  const now = new Date()
  const resultsTime = new Date(2022, now.getMonth(), now.getDate() , 16, 0, 0)

  useEffect(() => {
    if (now < resultsTime){
      setVotingPeriod(true)
    } else if ((now > resultsTime)) {
      setVotingPeriod(false)
    }
  }, [now , resultsTime]);
 

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

  // FamilyUID
  const [familyUIDInput , setFamilyUIDInput] = useState("")

  const handleJoinFamily = async () => {
    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){
        await updateDoc(doc(db,  "users" , uid), {
          familyUID: familyUIDInput,
        })
      }
      useSetUser.setFamilyUID(familyUIDInput)
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <div>
    {/* Logged In */}
    {!loading && <div>
    {uid && <div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <div className='text-left'>
      <img src="chef.gif" width={60} className='inline'/>
      <h1 className='text-3xl font-bold text-left inline py-3 uppercase self-center align-middle ml-2'>Shell's Kitchen</h1>
      </div>
      <div className='grid grid-cols-12 space-x-5'>
      <div className='col-span-12 md:col-span-3 p-4 rounded-md mt-3 bg-[#e1e1e1]'>
      <Login useSetUser={useSetUser} resultsTime={resultsTime}/>
      {familyUID && <div><FamilyAside familyUID={familyUID} uid={uid} useSetUser={useSetUser} /><FamilyMembersAside /></div> }
      {!familyUID && 
      <div className='bg-gray-200 p-5 my-3 grid grid-cols-5 self-center justify-center rounded-md space-x-2'>
      <label className='self-center col-span-2 '>Enter Family Code:</label>
      <input className='px-4 col-span-2' type="text" onChange={(e) => setFamilyUIDInput(e.target.value)} />
      <button className='bg-green-400 rounded-sm px-2 py-[5px]' onClick={() => handleJoinFamily(familyUIDInput , useSetUser)}>Join</button>
      </div>}
      </div>
      <div className='col-span-12 md:col-span-9  md:ml-5 -ml-5'>
      <MealGrid votingPeriod={votingPeriod} />
      </div>
      </div>
      {/* {admin && <AddMealForm />} */}
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
      {showLogin && <Login useSetUser={useSetUser} />}
      {showSignUp && <Signup/>}
      </div>
    } </div> }


    {/* Loading State */}
    {loading && <p>Loading...</p>}

    </div>
  )
  
  
}

export default App
