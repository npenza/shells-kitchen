import { getAuth , updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebase';
import { useAllFamilyMembers } from '../../hooks/useAllFamilyMembers';
import { useAllMeals } from '../../hooks/useAllMeals';
import { useAuthStore } from '../../store/useAuthStore'
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

    //State   
    const familyMembers = useAllFamilyMembers()
    const meals  = useAllMeals(false)


    // Update Account State
    const [newFname , setNewFname] = useState(currentFname)
    const [newLname , setNewLname] = useState(currentLname)
    const [newEmail , setNewEmail] = useState(enteredEmail)

    const handleSaveChanges = async () => {

        updateProfile(auth.currentUser, {
           //update auth 
          }).then(async () => {
            // Profile updated!
             // Make changes on Firebase
            const userDocRef = doc(db, 'users', uid)
            try{
            const docSnap = await getDoc(userDocRef);
            const userData = docSnap.data()
        
            if (userData){
                await updateDoc(doc(db,  "users" , uid), {
                Fname : newFname,
                Lname : newLname,
                email: newEmail
                })
            }
            useSetUser.setCurrentFname(newFname)
            useSetUser.setCurrentLname(newLname)
            useSetUser.setEnteredEmail(newEmail)
            } catch (e) {
            console.log(e)
            }
            // ...
          }).catch((error) => {
            // An error occurred
            console.log(error)
            // ...
          });

       
    }

    const handleUnhideMeal = async (id) => {

        const userDocRef = doc(db, 'meals', id)
        try{
        const docSnap = await getDoc(userDocRef);
        const mealData = docSnap.data()
    
        if (mealData){
            await updateDoc(doc(db,  "meals" , id), {
              hidden : false
              })
          } 

        } catch (e) {
        console.log(e)
        }
        // ...
      };


  return (
    <div className='bg-[#000000c0] w-[100%] h-[100%] fixed top-0 left-0 z-10'>
          <div className='bg-white w-1/2 mx-auto static mt-[20vh] rounded'>
            <h1>Settings</h1>
            <h2>Account Info</h2>
            <label for="fname">First Name</label>
            <input type="text" name="fname" className='bg-gray-200 mx-3 p-1 px-2' value={newFname} onChange={(e) => setNewFname(e.target.value)} />

            <label for="fname">Last Name</label>
            <input type="text" name="fname" className='bg-gray-200 mx-3 p-1 px-2' value={newLname} onChange={(e) => setNewLname(e.target.value)}/>

            <label for="fname">Email</label>
            <input type="email" name="fname" className='bg-gray-200 mx-3 p-1 px-2 disabled:text-gray-400' disabled value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>

            <button className='bg-gray-200 mx-3 p-1 px-2 rounded-sm'>Reset Password</button>
            <button onClick={() => handleSaveChanges()} className='bg-gray-400 mx-3 p-1 px-2 rounded-sm'>Save Changes</button>

            {admin && 
              <div>
              
              <h2>Hidden Meals</h2>
                {meals && meals.map((meal) => (
                    <div><p>{meal.data.title}</p> <button onClick={() => handleUnhideMeal(meal.id)}>unhide</button></div>
                ))}

                <h2>Family Info</h2>

                <h3>Current Members</h3>
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
