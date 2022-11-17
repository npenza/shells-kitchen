import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'

export function useAllMeals() {
  const [meals, setMeals] = useState(null);

  // use redux to include filters and search term

  useEffect(() => {
    const q = query(collection(db, 'meals') ,  orderBy("votes" , "desc"))
    onSnapshot(q, (querySnapshot) => {
      setMeals(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

  } , []);
  
    return meals;

}