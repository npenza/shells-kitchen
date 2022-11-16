import React from 'react'
import { useMealStore } from '../store/useMealStore';
import { useQuery } from '@tanstack/react-query'
import MealCard from '../components/MealCard';

export default function MealGrid() {
    const state = useMealStore()
    const { isLoading, error, data } = useQuery({
      queryKey: ['meals'],
      queryFn: () =>
        fetch('http://localhost:3000/meals').then(res => res.json()
        )
    })
  
    if (isLoading) return 'Loading Meals...'
  
    if (error) return 'An error has occurred: ' + error.message
  
    return (
      <div className='meal-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-3'>
      {data.map((meal) => (
        <MealCard meal={meal} />
      ))}
    </div>
    )
}
