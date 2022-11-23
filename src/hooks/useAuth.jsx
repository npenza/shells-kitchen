import { useEffect , useRef , useState } from "react";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import {doc , getDoc} from "firebase/firestore"
import {db} from '../../firebase'


const useAuth = (setUser) => {
    const [user, setUserLocal] = useState(null);
    const auth = getAuth();
  
    let mounted = useRef(false);
  
    useEffect( () => {
      mounted.current = true;
      const unsubscribe = onAuthStateChanged(auth,  async (user) => {
        console.log("onAuthUserChanged", user);
        if (user) {
          if (mounted.current) {
            setUserLocal(user);

            // Once user is logged in, find their details eg. votes, settings , name
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);
            const userData = await docSnap.data()

            // Assign user details to state (from collection)
            if(userData){
              await setUser.setVotes(userData.votes)
              await setUser.setCurrentFname(userData.Fname)
              await setUser.setCurrentLname(userData.Lname)
              await setUser.setCurrentUserAvatar(userData.avatar)
              await setUser.setAdmin(userData.admin)
              await setUser.setSuperAdmin(userData.SuperAdmin)
              if(userData.familyUID){
                await setUser.setFamilyUID(userData.familyUID)
              }
  
              // Assign user details to state (from auth)
              await setUser.setCurrentUsername(user.email)
              await setUser.setEnteredEmail(user.email)
              await setUser.setUID(user.uid)
            }
          }
        } else {
          if (mounted.current) {
            setUserLocal(null);
            setUser.setCurrentUsername("")
            setUser.setEnteredEmail("")
            setUser.setUID("")
          }
        }
      });
  
      return () => {
        mounted.current = false;
        unsubscribe();
      };
    }, [auth]);
  
    return {
      user,
      auth,
    };
  };
  
  export { useAuth };