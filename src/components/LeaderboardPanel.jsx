import React, { useState , useEffect } from 'react';
import { useVotersForMeal } from '../hooks/useVotersForMeal';

const LeaderboardPanel = ({meal}) => {

    const voters = useVotersForMeal(meal.id)

    return (
        <div key={meal.id} className='grid grid-cols-5 shadow-md my-2 rounded-lg bg-white'>
        <div className='col-span-1'>
          <img className='w-[100%] h-[100%] aspect-square object-cover rounded-lg' src={meal.data.img} />
        </div>
        <div className='col-span-4 text-left pl-3 self-center'>
          <h2 className='text-xl font-medium'>{meal.data.title}</h2>
          <p>{meal.data.votes} {meal.data.votes == 1 ? "voter" : "voters"}</p>
        <div className='flex space-x-3 my-3'>
            {voters && voters.map((voter) => (
            <img src={voter.data.avatar} className="w-8 rounded-full" />
            ))}
        </div>          
          
        </div>
        </div>
    );
}

export default LeaderboardPanel;
