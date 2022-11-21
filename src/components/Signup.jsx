import { uploadBytes, uploadBytesResumable , ref , getDownloadURL} from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../firebase';
import { useAuthStore } from '../store/useAuthStore';
import { handleSignUp } from '../utils/auth/handleSignUp';
import Login from './Login';

const Signup = () => {
    
  // Load Redux Props
  const currentUsername = useAuthStore((state) => state.currentUsername)
  const currentFname = useAuthStore((state) => state.currentFname)
  const currentLname = useAuthStore((state) => state.currentLname)
  const currentUserAvatar = useAuthStore((state) => state.currentUserAvatar)
  const enteredEmail = useAuthStore((state) => state.enteredEmail)
  const enteredPassword = useAuthStore((state) => state.enteredPassword)
  const uid = useAuthStore((state) => state.uid)
  const votes = useAuthStore((state) => state.votes)
  const errorMessage = useAuthStore((state) => state.errorMessage)

  // Load Redux Methods
  const useSetUser = {
    setCurrentUsername : useAuthStore((state) => state.setCurrentUsername),
    setCurrentFname : useAuthStore((state) => state.setCurrentFname),
    setCurrentLname : useAuthStore((state) => state.setCurrentLname),
    setCurrentUserAvatar : useAuthStore((state) => state.setCurrentUserAvatar),
    setEnteredEmail : useAuthStore((state) => state.setEnteredEmail),
    setEnteredPassword :useAuthStore((state) => state.setEnteredPassword),
    setAccessToken : useAuthStore((state) => state.setAccessToken),
    setUID : useAuthStore((state) => state.setUID),
    setErrorMessage : useAuthStore((state) => state.setErrorMessage),
    setVotes : useAuthStore((state) => state.setVotes),
    setLoading : useAuthStore((state) => state.setLoading)
  }

  // Upload File
  const [percent, setPercent] = useState("");

  const handleFileUpload = (e) => {
    const storageRef = ref(storage, `/files/${e.target.files[0].name}`)
    const uploadTask = uploadBytesResumable(storageRef , e.target.files[0])

    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            useSetUser.setCurrentUserAvatar(url);
          });
      }
  ); 
  }
    return (
        <div>
            <label>avatar</label>
            <input className='bg-gray-300' onChange={(e) => handleFileUpload(e)} type="file" accept=".jpg,.jpeg,.gif,.png,.webp" />
            <input className='bg-gray-300' placeholder="First Name" onChange={(e) => useSetUser.setCurrentFname(e.target.value)} value={currentFname} type="text" name="Fname" id="" />
            <input className='bg-gray-300' placeholder="Last Name" onChange={(e) => useSetUser.setCurrentLname(e.target.value)} value={currentLname} type="text" name="Lname" id="" />
            <input className='bg-gray-300' placeholder="Email" onChange={(e) => useSetUser.setEnteredEmail(e.target.value)} value={enteredEmail} type="text" name="email" id="" />
            <input className='bg-gray-300' placeholder="Password" onChange={(e) => useSetUser.setEnteredPassword(e.target.value)} value={enteredPassword} type="password" name="email" id="" />
            <button onClick={() => handleSignUp(currentFname , currentLname, currentUserAvatar , enteredEmail , enteredPassword , useSetUser , "")}>Sign Up</button>
        </div>
    );
}

export default Signup;
