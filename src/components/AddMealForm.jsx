import React from 'react'
import { useState } from 'react'
import { handleAddMeal } from '../utils/handleAddMeal'
import { uploadBytes, uploadBytesResumable , ref , getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase';
import { useAuthStore } from '../store/useAuthStore';
import MealCard from './MealCard';
import MealCardPREVIEW from './MealCardPREVIEW';


export default function AddMealForm({setShowAddMeal}) {

    // form data
    const [title , setTitle] = useState("")
    const [img , setImg] = useState("")
    const [description , setDescription] = useState("")
    const [rating , setRating] = useState("")
    const familyUID = useAuthStore((state) => state.familyUID)

    // error titles

    const [submitActive , setSubmitActive] = useState(false)

    const checkActive = () => {
      if(title && img && description && rating){
        return true
      } else {
        return false
      }
    }
    

    const handleSubmit = () => {
      if(checkActive() == true){
        handleAddMeal(title , img , description , rating , familyUID)
        setShowAddMeal(false)
        // Reset Local Use States
        setTitle("")
        setImg("")
        setDescription("")
        setRating("")
      } else {
        alert("fill out all fields")
      }
       
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
    <div className='grid grid-cols-12 mx-5 text-xl'>
        <label htmlFor="" className='col-span-2 my-5'>Title</label>
        <input className='bg-[#ECECEC] col-span-10 my-5 p-3 rounded-md' onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="" />
        <label htmlFor="" className='col-span-2 my-5'>Image</label>
        <input className='bg-[#ECECEC] col-span-10 my-5 p-3 rounded-md' onChange={(e) => handleFileUpload(e)} type="file" accept=".jpg,.jpeg,.gif,.png,.webp" />
        <label htmlFor="" className='col-span-2 my-5'>Description</label>
        <textarea className='bg-[#ECECEC] col-span-10 my-5 p-3 rounded-md resize-none' maxLength={125} rows={3}  onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" id="" />
        <label htmlFor="" className='col-span-2 my-5'>Rating</label>
        <select className='bg-[#ECECEC] col-span-10 my-5 p-3 rounded-md'  onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="rating" id="">
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select>
        <p className='mt-5 text-gray-400'>Preview</p>
        <div className='col-span-12'>
          <MealCardPREVIEW title={title} img={img} rating={rating} description={description} />
        </div>
        <button onClick={() => handleSubmit()} className="col-span-12 bg-gray-400 duration-75 ease-in transition-all hover:bg-[#5B8957] text-white rounded-md py-2 my-4">Submit</button>
      </div>
  )
}
