import { getAuth , updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { useAllFamilyMembers } from '../../hooks/useAllFamilyMembers';
import { useAllMeals } from '../../hooks/useAllMeals';
import { useAuthStore } from '../../store/useAuthStore'
import { handleSaveChanges } from '../../utils/auth/handleSaveChanges';
import { handleUnhideMeal } from '../../utils/handleUnhideMeal';
import MemberSetting from '../MemberSetting';


export default function SettingModal({setSettingsOpen , useSetUser}) {

    // Load Redux Props
    const auth = getAuth();
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

    //Load State From Custom Hooks   
    const familyMembers = useAllFamilyMembers()
    const meals  = useAllMeals(false)

    // Update Account State (Form)
    const [newFname , setNewFname] = useState(currentFname)
    const [newLname , setNewLname] = useState(currentLname)
    const [newEmail , setNewEmail] = useState(enteredEmail)

  return (
    <div className='bg-[#000000c0] w-[100%] h-[100%] fixed top-0 left-0 z-10'>
          <div className='bg-white w-1/2 mx-auto static mt-5 rounded'>
            <h2 className='text-5xl text-[#555555] font-extrabold py-5 mx-5 text-center'>Settings</h2>
            <h2 className='text-2xl text-[#555555] font-extrabold py-5 mx-5 text-left'>Account Info</h2>
            <div className='grid grid-cols-12 space-y-3 mb-5'>
            <label for="fname" className='col-span-2 self-center align-middle justify-center'>First Name</label>
            <input type="text" name="fname" className='bg-gray-200 mx-3 p-2 col-span-10' value={newFname} onChange={(e) => setNewFname(e.target.value)} />
            <label for="fname" className='col-span-2 self-center align-middle justify-center'>Last Name</label>
            <input type="text" name="fname" className='bg-gray-200 mx-3 p-2 col-span-10' value={newLname} onChange={(e) => setNewLname(e.target.value)}/>
            <label for="fname" className='col-span-2 self-center align-middle justify-center'>Email</label>
            <input type="email" name="fname" className='bg-gray-200 mx-3 p-2 disabled:text-gray-400 col-span-10' disabled value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
            <label className='col-span-2 self-center align-middle justify-center'>Password</label>
            <button className='bg-gray-200 mx-3 p-1 px-2 rounded-sm col-span-10'>Reset Password</button>
            </div>
            <button onClick={() => handleSaveChanges( auth, uid , useSetUser , newFname , newLname , newEmail)} className='bg-gray-400 mx-3 p-1 px-2 rounded-sm'>Save Changes</button>

            {admin && 
              <div>
                <h2 className='text-2xl text-[#555555] font-extrabold py-5 mx-5 text-left'>Hidden Meals</h2>
                {meals && meals.map((meal) => (
                    <div><p>{meal.data.title}</p> <button onClick={() => handleUnhideMeal(meal.id)}>unhide</button></div>
                ))}


                <h2 className='text-2xl text-[#555555] font-extrabold py-5 mx-5 text-left'>Family</h2>
                <div className='grid grid-cols-4 space-x-5 mx-5'>
                {familyMembers && familyMembers.map((member) => (
                    <MemberSetting member={member} uid={uid}/>
                ))}
                </div>
              </div>
            }
            <br />
            <button onClick={() => setSettingsOpen(false)} className='bg-red-300 rounded-md my-5 p-3'>Close Settings</button>
          </div>
        </div>
  )
}
