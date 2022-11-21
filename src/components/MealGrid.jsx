import randomString from 'random-string-gen';
import React, { useState } from 'react'
import MealCard from '../components/MealCard';
import { useAllMeals } from '../hooks/useAllMeals';
import { useAuthStore } from '../store/useAuthStore';
import { useMealFilterStore } from '../store/useMealFilterStore';
import { doc, updateDoc , getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export default function MealGrid() {

  const [searchTerm , setSearchTerm] = useState("")
  
  const meals  = useAllMeals()

  // Load Redux Props
  const order = useMealFilterStore((state) => state.order);
  const rating = useMealFilterStore((state) => state.rating);
  const uid = useAuthStore((state) => state.uid)
  const familyUID = useAuthStore((state) => state.familyUID)

  // Load Redux Methods
  const setOrder = useMealFilterStore((state) => state.setOrder);
  const setRating = useMealFilterStore((state) => state.setRating);
  const setFamilyUID = useAuthStore((state) => state.setFamilyUID);


  // Create Family

  const handleCreateFamily = async () => {
    const newFamilyID = randomString(7).toUpperCase()

    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){
        await updateDoc(doc(db,  "users" , uid), {
          familyUID: newFamilyID,
        })
      }
      setFamilyUID(newFamilyID)
      alert("connected" , newFamilyID)
    } catch (e) {
      console.log(e)
    }
  }

    return (
      <div>
      {/* <label>Sort By</label>
      
      <label>
      Rating</label>
      <select onChange={(e) => setRating(e.target.value)} className='bg-gray-200' placeholder='none' label='Rating' name="" id="">
      <option value="">All</option>
      <option value="Light">Light</option>
      <option value="Medium">Medium</option>
      <option value="Heavy">Heavy</option>
      </select>
      <input type="text" placeholder='search' className='bg-gray-200' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}
      <div className='filters w-100 grid grid-cols-12 my-3'>
      <select className='p-2 rounded-sm' onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      </div>

      {!familyUID && <div>
      <p>Looks like you're not connected to a family.</p>
      <button>Join Family</button>
      <button onClick={() => handleCreateFamily()}>Create Family</button>
      </div>}
      
      <div className='meal-grid grid'>
      {meals && meals.map((meal) => (
        <MealCard key={meal.id} id={meal.id} meal={meal.data} />
      ))}
    </div>
      </div>
      
    )
}
