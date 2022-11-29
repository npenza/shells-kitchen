import randomString from 'random-string-gen';
import React, { useState } from 'react'
import MealCard from '../components/MealCard';
import { useAllMeals } from '../hooks/useAllMeals';
import { useAuthStore } from '../store/useAuthStore';
import { useMealFilterStore } from '../store/useMealFilterStore';
import { doc, updateDoc , getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import AddMealForm from './AddMealForm';
import { motion } from "framer-motion"
import { useMealByID } from '../hooks/useMealByID';
import VotedMealPanel from './VotedMealPanel';
import { useMealsWithVotes } from '../hooks/useMealsWithVotes';
import toast from 'react-hot-toast';

export default function MealGrid({votingPeriod}) {

  const [searchTerm , setSearchTerm] = useState("")
  const meals  = useAllMeals(true)

  // Load Redux Props
  const order = useMealFilterStore((state) => state.order);
  const rating = useMealFilterStore((state) => state.rating);
  const uid = useAuthStore((state) => state.uid)
  const familyUID = useAuthStore((state) => state.familyUID)
  const admin = useAuthStore((state) => state.admin)
  const mealVotedFor = useAuthStore((state) => state.mealVotedFor)

  // Load Redux Methods
  const setOrder = useMealFilterStore((state) => state.setOrder);
  const setRating = useMealFilterStore((state) => state.setRating);
  const setFamilyUID = useAuthStore((state) => state.setFamilyUID);
  const setAdmin = useAuthStore((state) => state.setAdmin);

  // Winning Meal
  const winningMeal = useMealsWithVotes(familyUID)

  // Create Family
  const handleCreateFamily = async () => {
    const newFamilyID = randomString(8).toUpperCase()

    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){
        await updateDoc(doc(db,  "users" , uid), {
          familyUID: newFamilyID,
          admin: true
        })
      }
      setFamilyUID(newFamilyID)
      setAdmin(true)
      toast.success("New family created.")
    } catch (e) {
      console.log(e)
    }
    
}

    const [showAddMeal , setShowAddMeal] = useState(false)
 

    return (
      <div>
        {showAddMeal && 
        <div className='bg-[#000000c0] w-[100%] h-[100%] fixed top-0 left-0 z-10'>
        <motion.div
        initial={{ translateY: -300 }}
        whileInView={{ translateY: 20 }}
        > 
        <div className='bg-white border-b-gray-200 border-b-8 w-1/2 mx-auto static mt-8  max-w-[900px] py-5 rounded text-left h-auto shadow-2xl'>
            <div onClick={() => setShowAddMeal(false)} className='hover:bg-red-300 bg-gray-300 font-bold text-center text-gray-500 rounded transition-all ease-in-out duration-75 float-right relative -top-16 hover:-top-14 p-4 pb-8 pr-7 w-[1em] -z-10 hover:cursor-pointer'>X</div>
              <h2 className='text-5xl text-[#555555] font-extrabold py-5 mx-5 text-center'>Add <span className='bg-[#5B8957] text-white px-2 rounded-md'>Meal</span></h2>
              <AddMealForm setShowAddMeal={setShowAddMeal}/>
            </div> 
        </motion.div>
          </div> }
      <div className='filters w-100 grid grid-cols-12 m-3'>
      {admin && familyUID && <button onClick={() => setShowAddMeal(true)} className='bg-[#5B8957] hover:bg-green-600 text-white hover:font-bold px-3 col-span-2 rounded-sm mr-3 transition-all ease-in duration-75'>Add Meal</button> }
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

      {mealVotedFor && familyUID && <VotedMealPanel mealVotedFor={mealVotedFor} winningMeal={winningMeal} votingPeriod={votingPeriod} /> }
      
      <div className='meal-grid grid md:grid-cols-2'>
      {meals && meals.map((meal) => (
        <MealCard key={meal.id} id={meal.id} meal={meal.data} votingPeriod={votingPeriod} />
      ))}
      {admin && meals && familyUID && meals.length == 0 && <div>
        <h2>This app is a lot more fun when there are meals to vote for.</h2>
        <button>Add Meal</button>
        <button>Settings</button>
      </div>}

      {!admin && meals && familyUID && meals.length == 0 && <div>
        <h2>There aren't any meals loaded in this family account. Ask the admin to load up some of your family favs!</h2>
      </div>}
    </div>
      </div>
      
    )
}
