import { browserLocalPersistence, getAuth , GoogleAuthProvider, setPersistence, signInWithEmailAndPassword , signInWithPopup } from "firebase/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { handleSignIn } from "./handleSignIn";
import {db} from '../../../firebase'
import {doc , setDoc , getDoc}  from "firebase/firestore"
import { handleSignUp } from "./handleSignUp";

export const handleSignInProvider = async (useSetUser) => {
   
const auth = getAuth();


// Sign in with provider
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    console.log("the user is", user.uid)
    const userDocRef = doc(db, 'users', user.uid)
  try{
    const docSnap = await getDoc(userDocRef);
    const userData = docSnap.data()

    if (userData){
      console.log("found user in DB")
      // Find collection info

      // Set here
      await useSetUser.setCurrentUsername(user.email)
      await useSetUser.setEnteredEmail(user.email)
      await useSetUser.setUID(user.uid)

      // handleSignIn(user.email , user.accessToken , useSetUser)
    }else {
      console.log("create user in DB" , user.email)
      handleSignUp(user.displayName.split(" ")[0] , user.displayName.split(" ")[1] , user.photoURL , user.email , user.accessToken , useSetUser , user.uid)
    }
  } catch(e) {
  }   


// Check if UID exsists in /user (if so - sign in)
    // const docRef = await doc(db, "users", user.uid)
    // const docSnap = await getDoc(docRef);
    // const userData = await docSnap.data()

    // await console.log(userData)

    
    
    // if (userData){
    //   console.log("user found - loggin in")
    //   handleSignIn(auth , user.email , user.accessToken)
    // } else {
    // // No Match? Sign user up.
    //   handleSignUp("Forced" , "ForcedLast" , "" , user.email , user.accessToken , useSetUser)
    //   console.log("user not created")
    // }

    // handleSignUp("Google" , "User" , "" , user.email , user.email , useSetUser )


  }).catch((error) => {

    console.log("cant sign in" , error)
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

// setUser.setErrorMessage("")

// signInWithEmailAndPassword(auth, email, password)
//   .then(async (userCredential) => {

//   // Signed in 


//   // setPersistence
//   await setPersistence(auth, browserLocalPersistence)
// })
//   .catch((error) => {
//   console.log("err", error)

//     switch (error.message) {
//       case "Firebase: Error (auth/invalid-email).":
//             setUser.setErrorMessage("Invalid Email")
//         break;
//       case "Firebase: Error (auth/wrong-password).":
//             setUser.setErrorMessage("Wrong password")
//         break;
//       default:
//         setUser.setErrorMessage(error.message)
//         break;
//     }
//   });
//   setUser.setEnteredEmail("")
//   setUser.setEnteredPassword("")
}