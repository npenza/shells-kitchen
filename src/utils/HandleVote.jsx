import {useState, useEffect} from 'react'
import {collection, query, doc , getDoc , orderBy, where, onSnapshot, updateDoc , FieldValue} from "firebase/firestore"
import {db} from '../../firebase'

export const handleVote = async (meal , id , setVotes , setMealVotedFor , uid) => {
  // Get Refs
  const mealDocRef = doc(db, 'meals', id)
  const userlDocRef = doc(db, 'users', uid)
  try{

    // Find user data
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data()

    //Can the user vote?
    if (userData.votes == 0){
      alert("You have ran out of votes haha")
    } else if (!userData.familyUID){
      location.reload()
    } else {
      // Update meal votes
      await updateDoc(mealDocRef, {
        votes : meal.votes + 1
      })

      // Update user votes
      await updateDoc(userlDocRef, {
        votes : userData.votes - 1,
        activeMealVote : id
      })
  
      // Set votes in state
      setVotes(userData.votes - 1)
      setMealVotedFor(id)
    }

  } catch (err) {
    console.log(err)
  }    
}