import React, { useState } from 'react'
import MealCard from '../components/MealCard';
import { useAllMeals } from '../hooks/useAllMeals';
import { useMealFilterStore } from '../store/useMealFilterStore';

export default function MealGrid() {

  const [searchTerm , setSearchTerm] = useState("")
  
  const meals  = useAllMeals()

  // Load Redux Props
  const order = useMealFilterStore((state) => state.order);
  const rating = useMealFilterStore((state) => state.rating);

  // Load Redux Methods
  const setOrder = useMealFilterStore((state) => state.setOrder);
  const setRating = useMealFilterStore((state) => state.setRating);

    return (
      <div>
      {/* <label>Sort By</label>
      
      <label>
      Rating</label>
      <select onChange={(e) => setRating(e.target.value)} className='bg-gray-200' placeholder='none' label='Rating' name="" id="">
      <option value="">All</option>
      <option value="Light">Light</option>
      <option value="Medium">Medium</option>
      <option value="Heavy">Heavy</option>
      </select>
      <input type="text" placeholder='search' className='bg-gray-200' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}
      <div className='filters w-100 grid grid-cols-12 my-3'>
      <select className='p-2 rounded-sm' onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      </div>
      
      <div className='meal-grid grid'>
      {meals && meals.map((meal) => (
        <MealCard key={meal.id} id={meal.id} meal={meal.data} />
      ))}
    </div>
      </div>
      
    )
}
