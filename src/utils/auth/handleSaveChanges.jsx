import { updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const handleSaveChanges = async ( auth , uid , useSetUser , newFname , newLname , newEmail) => {
    updateProfile(auth.currentUser, {
       //update auth 
      }).then(async () => {
        // Profile updated!
         // Make changes on Firebase
        const userDocRef = doc(db, 'users', uid)
        try{
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data()
    
        if (userData){
            await updateDoc(doc(db,  "users" , uid), {
            Fname : newFname,
            Lname : newLname,
            email: newEmail
            })
        }
        useSetUser.setCurrentFname(newFname)
        useSetUser.setCurrentLname(newLname)
        useSetUser.setEnteredEmail(newEmail)
        } catch (e) {
        console.log(e)
        }
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error)
        // ...
      });
}