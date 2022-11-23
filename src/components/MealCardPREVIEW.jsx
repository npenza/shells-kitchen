import React from 'react'



export default function MealCardPREVIEW({title , description , img , rating}) {



  return (
    <div className='meal-card grid grid-cols-12 justify-start flex-col my-3 bg-white  rounded-md shadow-md text-left'>

      <div className="w-32 aspect-square rounded col-span-1">
        <img src={img ? img : "https://media.tenor.com/2yQv-RptjeQAAAAC/fastfood.gif"} className="object-cover rounded-md h-[100%]" />
      </div>
      <div className='col-span-9 ml-24 md:ml-20 xl:ml-16 span-8 self-center'>
      <p className={rating}>{rating}</p>
      <p className=' text-3xl font-bold'>{title ? title : "Title"}</p>
      <p className=' text-sm font-medium break-words w-[100%]'>{description ? description : "Description"}</p>
      </div>
      <div className='col-span-2 self-center text-center'>
      </div>
    </div>
  )
}

