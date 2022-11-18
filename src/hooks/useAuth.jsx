import { useEffect , useRef , useState } from "react";
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const useAuth = (setUser) => {
    const [user, setUserLocal] = useState(null);
    const auth = getAuth();
  
    let mounted = useRef(false);
  
    useEffect(() => {
      mounted.current = true;
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("onAuthUserChanged", user);
        if (user) {
          if (mounted.current) {
            setUserLocal(user);
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