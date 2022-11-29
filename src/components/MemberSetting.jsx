import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'

export default function MemberSetting({member , uid}) {

    const [profileOpen , setProfileOpen] = useState(false)

    // Settings Methods
    const handleAddAdmin = async () => {

            // Make changes on Firebase
             const userDocRef = doc(db, 'users', member.id)
             try{
             const docSnap = await getDoc(userDocRef);
             const userData = docSnap.data()
         
             if (userData){
                 await updateDoc(doc(db,  "users" , member.id), {
                 admin: true,
                 })
             }

             } catch (e) {
             console.log(e)
             }
             // ...
        }

        const handleRevokeAdmin = async () => {

            // Make changes on Firebase
             const userDocRef = doc(db, 'users', member.id)
             try{
             const docSnap = await getDoc(userDocRef);
             const userData = docSnap.data()
         
             if (userData){
                 await updateDoc(doc(db,  "users" , member.id), {
                 admin: false,
                 })
             }

             } catch (e) {
             console.log(e)
             }
             // ...
        }

        const handleRemoveUserFromFamily = async () => {

            // Make changes on Firebase
             const userDocRef = doc(db, 'users', member.id)
             try{
             const docSnap = await getDoc(userDocRef);
             const userData = docSnap.data()
         
             if (userData){
                 await updateDoc(doc(db,  "users" , member.id), {
                 admin: false,
                 familyUID: ''
                 })
             }

             } catch (e) {
             console.log(e)
             }
             // ...
        }
        

  return (
    <div key={member.id} onMouseLeave={() => setProfileOpen(false)} onMouseEnter={() => setProfileOpen(true)} className='grid grid-cols-4 h-20 bg-white hover:bg-[#354c2e]  hover:cursor-pointer transition-all ease-in-out duration-75 shadow-md rounded-md my-5 px-3'>
    <div className='col-span-1'>
    <img src={member.data.avatar} className="w-14 rounded-full self-center aspect-square object-cover my-2"/>
    </div>
    <div className='col-span-3 self-center items-center'>
    <p className='text-left text-lg ml-2'>{member.data.Fname} {member.data.Lname}</p>
    {member.data.admin && <span className='text-start'>Admin</span>}
    </div>
    
    {profileOpen &&
    <div className='bg-red-400  w-[10rem]'>
    <ul className='list-none text-left mx-2'>
    {!member.data.admin && <li className='hover:text-white' onClick={() => handleAddAdmin()}>Add Admin</li> }
    {member.data.admin && member.id != uid && <li className='hover:text-white' onClick={() => handleRevokeAdmin()}>Revoke Admin</li> }
    {!member.data.admin && member.id != uid && <li className='hover:text-white' onClick={() => handleRemoveUserFromFamily()}>Remove Account</li> }
    </ul>
    </div> }
    </div>
  )
}
