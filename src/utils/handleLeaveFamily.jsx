import { doc, updateDoc , getDoc, limit } from 'firebase/firestore'
import { db } from '../../firebase';

export const handleLeaveFamily = async (uid , useSetUser) => {
    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){

        if (userData.activeMealVote){
            const mealDocRef = doc(db, 'meals', userData.activeMealVote)
            const docSnap = await getDoc(mealDocRef);
            const mealData = docSnap.data()

            await updateDoc(doc(db,  "meals" , userData.activeMealVote), {
              votes: mealData.votes - 1
            })
        }

        await updateDoc(doc(db,  "users" , uid), {
          familyUID: "",
          admin: false,
          votes: 1,
          activeMealVote: ""
        })
      }
      useSetUser.setFamilyUID("")
      useSetUser.setAdmin(false)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }