import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc, getDoc} from "firebase/firestore"
import {db} from '../../firebase'
import { useAuthStore } from '../store/useAuthStore'

export const resetAllVotes = async (setVotes, uid) => {

    const qMeals = query(collection(db, 'meals'))
     onSnapshot(qMeals, (querySnapshot) => {
      querySnapshot.docs.forEach(async (meal) => {
        const prevData = meal.data()
        await setDoc(doc(db,  "meals" , meal.id ), {
          title: prevData.title,
          img: prevData.img,
          rating: prevData.rating,
          votes: 0
        })
      })
    })

    const qUsers = query(collection(db, 'users'))
     onSnapshot(qUsers, (querySnapshot) => {
      querySnapshot.docs.forEach(async (user) => {
        const prevData = user.data()
        console.log(user.id)
        await setDoc(doc(db,  "users" , user.id ), {
          email: prevData.email,
          votes: 1
        })
      })
    })

    // Reset user data 
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef);
    const userData = await docSnap.data()

    // Set votes in state
    await setVotes(userData.votes)
  }