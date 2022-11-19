import {useState, useEffect} from 'react'
import {collection, query, orderBy, where, onSnapshot , doc , getDoc } from "firebase/firestore"
import {db} from '../../firebase'

export async function useUserDataByUID(uid) {
  const [userData, setUserData] = useState(null);

  if(uid){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data())
  } else {
    console.log
  }
 
    return userData;

}