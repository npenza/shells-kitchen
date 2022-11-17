import {useState, useEffect} from 'react'
import {collection, query, doc , orderBy, where, onSnapshot, updateDoc} from "firebase/firestore"
import {db} from '../../firebase'

export const handleVote = async (meal , id) => {
  const mealDocRef = doc(db, 'meals', id)
  try{
    await updateDoc(mealDocRef, {
      votes : meal.votes + 1
    })
  } catch (err) {
    console.log(err)
  }    
}