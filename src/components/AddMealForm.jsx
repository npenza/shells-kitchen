import React from 'react'
import { useState } from 'react'
import { handleAddMeal } from '../utils/handleAddMeal'
import { uploadBytes, uploadBytesResumable , ref , getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase';
import { useAuthStore } from '../store/useAuthStore';


export default function AddMealForm() {

    const [title , setTitle] = useState("")
    const [img , setImg] = useState("")
    const [rating , setRating] = useState("")
    const familyUID = useAuthStore((state) => state.familyUID)

    const handleSubmit = () => {
        handleAddMeal(title , img , rating , familyUID)
        
        // Reset Local Use States
        setTitle("")
        setImg("")
        setRating("")
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
            setImg(url);
          });
      }
  ); 
  }

  return (
    <div className='border-3 border-black'>
        <input className='bg-gray-300' placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="" />
        <input className='bg-gray-300' onChange={(e) => handleFileUpload(e)} type="file" accept=".jpg,.jpeg,.gif,.png,.webp" />
        <input className='bg-gray-300' placeholder="Rating" onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="rating" id="" />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
  )
}
