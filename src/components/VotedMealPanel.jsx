import React from 'react';
import { useMealByID } from '../hooks/useMealByID';
import {useMealsWithVotes} from '../hooks/useMealsWithVotes'
import { useAuthStore } from '../store/useAuthStore';

const VotedMealPanel = ({mealVotedFor , winningMeal , votingPeriod}) => {
        
        // Redux
        const familyUID = useAuthStore((state) => state.familyUID)

        // Get voted for meal 
        const votedMeal = useMealByID(mealVotedFor)

        return (
            <>
            {votingPeriod && familyUID && <div className='bg-[#5B8957] text-white py-3 mx-3 rounded-sm'>
            <p>You have voted for <strong>{votedMeal.title}</strong>.</p>
            <p>The winning dish will be announced here at 4pm.</p>
            </div>}

            {!votingPeriod && winningMeal && familyUID && <div className='bg-[#5B8957] text-white py-3 mx-3 rounded-sm'>
            <p>The voting has ended. The winning dish is: {winningMeal[0].data.title}</p>
            </div>}
            </>
        );
 
}

export default VotedMealPanel;
