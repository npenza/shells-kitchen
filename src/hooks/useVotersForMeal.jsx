import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'

export function useVotersForMeal(mealID) {

  const [voters, setVoters] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'users') , where("activeMealVote" , "==" , mealID))
    onSnapshot(q, (querySnapshot) => {
        setVoters(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

  } , []);

  return voters;
}