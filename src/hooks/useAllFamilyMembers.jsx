import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'
import {doc , getDoc} from "firebase/firestore"
import { useMealFilterStore } from '../store/useMealFilterStore';
import { useAuthStore } from '../store/useAuthStore';

export function useAllFamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState(null);

  // use redux to include filters and search term
  const familyUID = useAuthStore((state) => state.familyUID)

  useEffect(() => {
    const q = query(collection(db, 'users') , where("familyUID" , "==" , familyUID), where("familyUID" , "!=" , ""))
      onSnapshot(q, (querySnapshot) => {
        setFamilyMembers(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })

  } , [familyUID]);
  
    return familyMembers;

}