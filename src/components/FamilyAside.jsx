import React from 'react';
import Leaderboard from './Leaderboard';
import { useAuthStore } from '../store/useAuthStore';
import { handleLeaveFamily } from '../utils/handleLeaveFamily';
import { useAllFamilyMembers } from '../hooks/useAllFamilyMembers';

const FamilyAside = ({familyUID , uid , useSetUser}) => {

    const family = useAllFamilyMembers()

    return (
        <><Leaderboard familyUID={familyUID} />
        <div className='bg-gray-300 p-5 my-3 flex self-center rounded-md justify-center'>
            <p className='self-center'>Your family code is: <strong className='hover:cursor-pointer hover:bg-blue-200' onClick={() => navigator.clipboard.writeText(familyUID)}>{familyUID}</strong></p> 
            <button className='bg-red-300 p-2 rounded-md ml-10' onClick={() => handleLeaveFamily(uid , useSetUser , family)}>Leave Family</button>
        </div>
        
        </>
    );
}

export default FamilyAside;
