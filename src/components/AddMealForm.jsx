import React from 'react'
import { useState } from 'react'
import { handleAddMeal } from '../utils/handleAddMeal'


export default function AddMealForm() {

    const [title , setTitle] = useState("")
    const [img , setImg] = useState("")
    const [rating , setRating] = useState("")

    const handleSubmit = () => {
        handleAddMeal(title , img , rating)
        
        // Reset Local Use States
        setTitle("")
        setImg("")
        setRating("")
    }

  return (
    <div className='border-3 border-black'>
        <input className='bg-gray-300' placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="" />
        <input className='bg-gray-300' placeholder="Image" onChange={(e) => setImg(e.target.value)} value={img} type="text" name="img" id="" />
        <input className='bg-gray-300' placeholder="Rating" onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="rating" id="" />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
  )
}
