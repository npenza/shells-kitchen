import React, { useState } from 'react'
import MealCard from '../components/MealCard';
import { useAllMeals } from '../hooks/useAllMeals';

export default function MealGrid() {

  const [searchTerm , setSearchTerm] = useState("")
  const [rating , setRating] = useState("")
  const meals  = useAllMeals()

  // use redux to update filters
  // use redux to update search term

    return (
      <div>
      <label>
      Rating</label>
      <select onChange={(e) => handleFilterUpdate(e.target.value)} className='bg-gray-200' label='Rating' name="" id="">
      <option value="Light">All</option>
      <option value="Light">Light</option>
      <option value="Medium">Medium</option>
      <option value="Heavy">Heavy</option>
      </select>
      <input type="text" placeholder='search' className='bg-gray-200' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className='meal-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-3'>
      {meals && meals.map((meal) => (
        <MealCard key={meal.id} id={meal.id} meal={meal.data} />
      ))}
    </div>
      </div>
      
    )
}
