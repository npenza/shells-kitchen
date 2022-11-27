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
    const mealVotedFor = useAuthStore((state) => state.mealVotedFor)

    // Load Redux Methods
    const setVotes = useAuthStore((state) => state.setVotes)
    const setMealVotedFor = useAuthStore((state) => state.setMealVotedFor)

    const handleHideMeal = async (e) => {
            e.stopPropagation();

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
    <>
    

    <div key={meal.id} onClick={() => handleVote(meal , id , setVotes , setMealVotedFor , uid)}  className='meal-card grid grid-cols-12 justify-start flex-col m-3 bg-white hover:scale-95 hover:cursor-pointer hover:shadow-xl transition-all ease-in-out duration-75 rounded-md shadow-md text-left'>


      <div className="w-32 aspect-square rounded col-span-2">
        <img src={meal.img} className="object-cover  rounded-md h-[100%]" />
      </div>
      <div className='col-span-10 ml-24 md:ml-20 xl:ml-10 span-8 self-center'>
      <div className='flex flex-row justify-between mr-6' >
    
      <div className='flex'>
      <p className={meal.rating} >{meal.rating}</p>
      </div>
      {admin && 
        <div onClick={(e) => handleHideMeal(e)} className='flex contents leading-[5px] -mt-1 p-3 pl-7 text-gray-600 hover:text-gray-200 transition-all ease-in-out duration-75 font-bold'>
        <img src='src/assets/hide-svgrepo-com.svg' width={23} className="hover:opacity-50"/>
      </div>
      }
     
     
      </div>
      <p className=' text-3xl font-bold'>{meal.title}</p>
      <p className=' text-sm font-medium break-words w-[100%]'>{meal.description}</p>
      </div>
      <div className='col-span-2 text-center'>
      {/* {admin && <button  className='bg-gray-600 hover:bg-red-700 transition-all ease-in-out duration-100 rounded py-2 px-2 m-2'>H</button>} */}
      </div>


     
  
    </div>

    
    </>

  )
}
