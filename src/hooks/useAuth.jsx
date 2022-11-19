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

            // Once user is logged in, find their details eg. votes, settings
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data()

            // Assign user details to state (from collection)
            setUser.setVotes(userData.votes)

            // Assign user details to state (from auth)
            setUser.setCurrentUsername(user.email)
            setUser.setEnteredEmail(user.email)
            setUser.setUID(user.uid)
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