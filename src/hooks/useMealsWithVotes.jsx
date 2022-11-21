import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'

export function useMealsWithVotes(familyUID) {
  const [votedMeals, setVotedMeals] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'meals') , where("votes" , ">" , 0), where("familyUID" , "==" , familyUID), orderBy("votes" , "desc"))
    onSnapshot(q, (querySnapshot) => {
    setVotedMeals(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

  } , []);

  return votedMeals;
}