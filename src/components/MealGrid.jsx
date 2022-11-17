import React from 'react'
import MealCard from '../components/MealCard';
import { useAllMeals } from '../hooks/useAllMeals';

export default function MealGrid() {

  const meals = useAllMeals()

    return (
      <div className='meal-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-3'>
      {meals && meals.map((meal) => (
        <MealCard key={meal.id} id={meal.id} meal={meal.data} />
      ))}
    </div>
    )
}
