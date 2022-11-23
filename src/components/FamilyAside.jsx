import React from 'react';
import Leaderboard from './Leaderboard';
import { useAuthStore } from '../store/useAuthStore';
import { handleLeaveFamily } from '../utils/handleLeaveFamily';

const FamilyAside = ({familyUID , uid , useSetUser}) => {

    return (
        <><Leaderboard familyUID={familyUID} /><br /><p>Your family UID is: {familyUID}</p><button onClick={() => handleLeaveFamily(uid , useSetUser)}>Leave Family</button></>
    );
}

export default FamilyAside;
