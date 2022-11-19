
import { getAuth , createUserWithEmailAndPassword  , setPersistence, browserLocalPersistence} from "firebase/auth";
import {db} from '../../../firebase'
import {doc , setDoc} from "firebase/firestore"

export const handleSignUp = async (email , password , setUser) => {
   
const auth = getAuth();
setUser.setErrorMessage("")

createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

  // Sign up default values
  const setNumOfVotes = 1
    
  // Create a user doc & set to default values
  await setDoc(doc(db,  "users" , userCredential.user.uid ), {
    email: userCredential.user.email,
    votes: setNumOfVotes
  });
  
  // Signed up & in 
  await setUser.setCurrentUsername(userCredential.user.email)
  await setUser.setEnteredEmail(userCredential.user.email)
  await setUser.setUID(userCredential.user.uid)
  await setUser.setVotes(setNumOfVotes)
  // add set fname
  setUser.setErrorMessage("")
  
  // setPersistence
  await setPersistence(auth, browserLocalPersistence)

  
})
  .catch((error) => {
  console.log("err", error)

    switch (error.message) {
      case "Firebase: Error (auth/invalid-email).":
            setUser.setErrorMessage("Invalid Email")
        break;
      case "Firebase: Error (auth/wrong-password).":
            setUser.setErrorMessage("Wrong password")
        break;
      default:
        setUser.setErrorMessage(error.message)
        break;
    }
  });
  setUser.setEnteredEmail("")
  setUser.setEnteredPassword("")
}