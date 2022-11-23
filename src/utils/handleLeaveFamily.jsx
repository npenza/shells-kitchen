import { doc, updateDoc , getDoc, limit } from 'firebase/firestore'
import { db } from '../../firebase';

export const handleLeaveFamily = async (uid , useSetUser) => {
    const userDocRef = doc(db, 'users', uid)
    try{
      const docSnap = await getDoc(userDocRef);
      const userData = docSnap.data()

      if (userData){
        await updateDoc(doc(db,  "users" , uid), {
          familyUID: "",
          admin: false
        })
      }
      useSetUser.setFamilyUID("")
      useSetUser.setAdmin(false)
    } catch (e) {
      console.log(e)
    }
  }