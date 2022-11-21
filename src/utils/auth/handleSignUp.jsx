
import { getAuth , createUserWithEmailAndPassword  , setPersistence, browserLocalPersistence} from "firebase/auth";
import {db} from '../../../firebase'
import {doc , setDoc } from "firebase/firestore"
import {useState} from 'react'
import { handleSignInProvider } from "./handleSignInProvider";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/useAuthStore";

export const handleSignUp = async (Fname , Lname , avatar , email , password , setUser , useruidprovider) => {
   
const auth = getAuth();
setUser.setErrorMessage("")

const setNumOfVotes = 1;

if (useruidprovider){
  console.log("using uid from provider")
  await setDoc(doc(db,  "users" , useruidprovider), {
    email: email,
    votes: setNumOfVotes,
    Fname: Fname,
    Lname: Lname,
    avatar: avatar
  })

  // handleSignInProvider(setUser)

} else {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

  // Sign up default values
  const setNumOfVotes = 1
    
  // Create a user doc & set to default values (Sends to firebase)
    console.log("using uid from usercred")
    await setDoc(doc(db,  "users" , userCredential.user.uid ), {
      email: email,
      votes: setNumOfVotes,
      Fname: Fname,
      Lname: Lname,
      avatar: avatar
    });
  })
}



  // // Signed up & in 
  // await setUser.setCurrentUsername(userCredential.user.email)
  // await setUser.setEnteredEmail(userCredential.user.email)
  // await setUser.setUID(userCredential.user.uid)
  // await setUser.setVotes(setNumOfVotes)
  // // add set avatar
  // await setUser.setCurrentFname(Fname)
  // await setUser.setCurrentLname(Lname)
  // await setUser.setCurrentAvatar(avatar)
  // setUser.setErrorMessage("")
  
  // setPersistence
  await setPersistence(auth, browserLocalPersistence)

  setUser.setLoading(true)

  setInterval(() => {
    setUser.setLoading(false)
    location.reload()
  }, 6000);

  // setUser.setEnteredEmail("")
  // setUser.setEnteredPassword("")
}
  // .catch((error) => {
  // console.log("err", error)

  //   switch (error.message) {
  //     case "Firebase: Error (auth/invalid-email).":
  //           setUser.setErrorMessage("Invalid Email")
  //       break;
  //     case "Firebase: Error (auth/wrong-password).":
  //           setUser.setErrorMessage("Wrong password")
  //       break;
  //     default:
  //       setUser.setErrorMessage(error.message)
  //       break;
  //   }
  // });

