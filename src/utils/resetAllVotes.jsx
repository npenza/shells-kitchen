import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc} from "firebase/firestore"
import {db} from '../../firebase'

export const resetAllVotes = async () => {
    const q = query(collection(db, 'meals'))
     onSnapshot(q, (querySnapshot) => {
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
  }