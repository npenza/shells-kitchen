import { doc, updateDoc , getDoc, limit } from 'firebase/firestore'
import { db } from '../../firebase';
import { useAllFamilyMembers } from '../hooks/useAllFamilyMembers';


export const handleLeaveFamily = async (uid , useSetUser , family) => {
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

        // const exitingFamilyUID = userData.familyUID
        //if 
        let adminTrueCount = 0
        console.log(family)
        family.forEach((member) => {
          if(member.data.admin == true && member.id != uid){
            adminTrueCount++
          }
        })

        if (adminTrueCount >= 1){
          console.log("other admins remain")
        } else {
          // render select an admin

          //temp fix - make everyone an admin
          family.forEach(async (member) => {
            if (member.id != uid){
              await updateDoc(doc(db,  "users" , member.id), {
                admin : true
              })
            }
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
      useSetUser.setMealVotedFor("")
      useSetUser.setAdmin(false)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }