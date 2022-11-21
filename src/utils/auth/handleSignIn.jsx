
import { browserLocalPersistence, getAuth , setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const handleSignIn = async (email , password , setUser) => {
   
const auth = getAuth();

// setUser.setErrorMessage("")

signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

  // Signed in 
  await setUser.setCurrentUsername(userCredential.user.email)
  await setUser.setEnteredEmail(userCredential.user.email)
  await setUser.setUID(userCredential.user.uid)
  // setUser.setErrorMessage("")

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