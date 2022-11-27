import {useState, useEffect} from 'react'
import {db} from '../../firebase'
import {doc , getDoc} from "firebase/firestore"

export function useMealByID(mealID) {
  const [meal, setMeal] = useState("");

    if(mealID){
        useEffect(async () => {
            const docRef = doc(db, "meals", mealID)
            const docSnap = await getDoc(docRef);
            const mealData = await docSnap.data()
     
            if (mealData){
             setMeal(mealData)
             console.log("meal:" , meal)
            } else {
             console.log("cant find for,", mealID)
            }
       } , [mealID]);
    }
 
  
  return meal;

}
