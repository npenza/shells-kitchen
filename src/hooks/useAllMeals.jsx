import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'
import {doc , getDoc} from "firebase/firestore"

export function useAllMeals() {
  const [meals, setMeals] = useState(null);

  // use redux to include filters and search term

  useEffect(() => {
    const q = query(collection(db, 'meals') ,  orderBy("title" , "asc"))
    onSnapshot(q, (querySnapshot) => {
      setMeals(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

  } , []);
  
    return meals;

}