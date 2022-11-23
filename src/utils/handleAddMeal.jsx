import {collection, query, orderBy, where, onSnapshot , updateDoc  ,doc , setDoc} from "firebase/firestore"
import {db} from '../../firebase'
import { v4 as uuidv4 } from 'uuid';


export const handleAddMeal = async (title , img , description , rating , familyUID) => {
    await setDoc(doc(db,  "meals" , uuidv4() ), {
      title: title,
      img: img,
      description: description,
      rating: rating,
      familyUID: familyUID,
      votes: 0,
      hidden: false
    });
  }