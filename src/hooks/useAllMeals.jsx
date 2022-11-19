import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'
import {doc , getDoc} from "firebase/firestore"
import { useMealFilterStore } from '../store/useMealFilterStore';

export function useAllMeals() {
  const [meals, setMeals] = useState(null);

  let mealsToRender = []

  // use redux to include filters and search term
  const order = useMealFilterStore((state) => state.order)
  const rating = useMealFilterStore((state) => state.rating);

  useEffect(() => {
    let q;
    
    if (rating){
       q = query(collection(db, 'meals'), where("rating" , "==", rating)  , orderBy("title" , order))
    } else {
       q = query(collection(db, 'meals') , orderBy("title" , order))
    }

      onSnapshot(q, (querySnapshot) => {
        setMeals(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })

  } , [order , rating]);
  
    return meals;

}