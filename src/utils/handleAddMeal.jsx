import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc} from "firebase/firestore"
import {db} from '../../firebase'
import { v4 as uuidv4 } from 'uuid';


export const handleAddMeal = async (title , img , rating) => {
    await setDoc(doc(db,  "meals" , uuidv4() ), {
      title: title,
      img: img,
      rating: rating,
      votes: 0
    });
  }