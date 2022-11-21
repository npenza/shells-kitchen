import { signOut , getAuth} from "firebase/auth";

export const handleSignOut = (useSetUser) => {
  const auth = getAuth()
  
    signOut(auth).then(() => {
      // Sign-out successful. (TODO - populate all useSetuUser fields)
      useSetUser.setCurrentUsername("")
      useSetUser.setEnteredEmail("")
      useSetUser.setCurrentFname("")
      useSetUser.setCurrentLname("")
      useSetUser.setUID("")
      useSetUser.setFamilyUID("")
    }).catch((error) => {
      // An error happened.
      console.log("error:", error)
    });
  }