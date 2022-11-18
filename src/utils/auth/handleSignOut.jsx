import { signOut , getAuth} from "firebase/auth";

export const handleSignOut = (useSetUser) => {
  const auth = getAuth()
  
    signOut(auth).then(() => {
      // Sign-out successful.
      useSetUser.setCurrentUsername("")
      useSetUser.setEnteredEmail("")
      useSetUser.setUID("")
    }).catch((error) => {
      // An error happened.
      console.log("error:", error)
    });
  }