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
import { doc, updateDoc , getDoc, limit } from 'firebase/firestore'
import { db } from '../firebase'
import { useAllFamilyMembers } from './hooks/useAllFamilyMembers'
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
    setLoading : useAuthStore((state) => state.setLoading)

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


  // FamilyUID
  const [familyUIDInput , setFamilyUIDInput] = useState("")
  const familyMembers = useAllFamilyMembers()

  // console.log(familyMembers.forEach((member) => {
  //   console.log(member)
  // }))

  const handleFamilyJoin = async () => {
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

  const handleLeaveFamily = async () => {
    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){
        await updateDoc(doc(db,  "users" , uid), {
          familyUID: "",
        })
      }
      useSetUser.setFamilyUID("")
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <div>
    {/* Logged In */}
    {!loading && <div>
    {uid && <div>
      <h1 className='text-3xl font-bold uppercase'>Shell's Kitchen</h1>
      <div className='grid grid-cols-12 space-x-5'>
      <div className='col-span-12 md:col-span-3'>
      <Login useSetUser={useSetUser}/>
      {familyUID && <div><Leaderboard familyUID={familyUID} /><br /><p>Your family UID is: {familyUID}</p><button onClick={() => handleLeaveFamily()}>Leave Family</button>
      {familyMembers && familyMembers.map((member) => (
        <div className='grid grid-cols-4 h-20 bg-white shadow-md rounded-md my-5 px-3'>
        <div className='col-span-1'>
        <img src={member.data.avatar} className="w-14 rounded-full self-center aspect-square object-cover my-2"/>
        {member.data.votes == 0 ? <p className="relative top-[-25px]">✅</p> : <p className="relative top-[-25px]">🤔</p>}
        </div>
        <div className='col-span-3 self-center items-center'>
        <p className='text-left text-xl'>{member.data.Fname} {member.data.Lname}</p>
        </div>
        </div>
      ))}
      </div>}

      {!familyUID && <div><label>Enter Family Code:</label><input type="text" onChange={(e) => setFamilyUIDInput(e.target.value)} /><button onClick={() => handleFamilyJoin()}>Join</button></div>}
      
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
      {showLogin && <Login useSetUser={useSetUser} />}
      {showSignUp && <Signup/>}
      </div>
    } </div> }



    {loading && <p>Loading...</p>}

    </div>
  )
  
  
}

export default App
