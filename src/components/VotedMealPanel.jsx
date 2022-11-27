import React from 'react';
import { useMealByID } from '../hooks/useMealByID';

const VotedMealPanel = ({mealVotedFor}) => {

        // Get voted for meal 
        const votedMeal = useMealByID(mealVotedFor)

        // Change vote functionality

        return (
            <div className='bg-[#5B8957] text-white py-3 mx-3 rounded-sm'>
                <p>You have voted for <strong>{votedMeal.title}</strong>.</p>
                <p>The winning dish will be announced here at 4pm.</p>
            </div>
        );
 
}

export default VotedMealPanel;
