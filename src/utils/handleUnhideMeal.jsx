import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const handleUnhideMeal = async (id) => {

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