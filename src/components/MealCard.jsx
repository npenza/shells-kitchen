import React from 'react'
import { handleVote } from '../utils/handleVote'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect , useState } from 'react'
import {updateDoc, doc , getDoc} from "firebase/firestore"
import {db} from '../../firebase'


export default function MealCard({meal , id}) {

    // Load Redux Props
    const uid = useAuthStore((state) => state.uid)
    const admin = useAuthStore((state) => state.admin)

    // Load Redux Methods
    const setVotes = useAuthStore((state) => state.setVotes)

    const handleHideMeal = async () => {

     
            const userDocRef = doc(db, 'meals', id)
            try{
            const docSnap = await getDoc(userDocRef);
            const mealData = docSnap.data()
        
            if (mealData){
              if (mealData.votes == 0){
                await updateDoc(doc(db,  "meals" , id), {
                  hidden : true
                  })
              } else {
                alert("Can't hide a meal with votes.")
              }
            }

            } catch (e) {
            console.log(e)
            }
            // ...
          };

       


  return (
    <div key={meal.id} className='meal-card grid grid-cols-12 justify-start flex-col my-3 bg-white  rounded-md shadow-md text-left'>

      <div className="w-32 aspect-square rounded col-span-1">
        <img src={meal.img} className="object-cover  rounded-md h-[100%]" />
      </div>
      <div className='col-span-9 ml-24 md:ml-20 xl:ml-10 span-8 self-center'>
      <p className={meal.rating} >{meal.rating}</p>
      <p className=' text-3xl font-bold'>{meal.title}</p>
      <p className=' text-sm font-medium break-words w-[100%]'>{meal.description}</p>
      </div>
      <div className='col-span-2 self-center text-center'>
      <button onClick={() => handleVote(meal , id , setVotes , uid)} className='bg-gray-600 hover:bg-green-700 transition-all ease-in-out duration-100 rounded py-2 px-2 m-2'><img src="vote.png" className='w-10 aspect-square' /></button>
     {admin && <button onClick={() => handleHideMeal()} className='bg-gray-600 hover:bg-red-700 transition-all ease-in-out duration-100 rounded py-2 px-2 m-2'>H</button>}
      </div>
    </div>
  )
}
