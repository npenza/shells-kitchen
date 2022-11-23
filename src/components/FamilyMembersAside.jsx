import React from 'react';
import { useAllFamilyMembers } from '../hooks/useAllFamilyMembers';

const FamilyMembersAside = ({familyUID}) => {

  const familyMembers = useAllFamilyMembers()

    return (
        <div>
        {familyMembers && familyMembers.map((member) => (
        <div className='grid grid-cols-4 h-20 bg-white shadow-md rounded-md my-5 px-3'>
        <div className='col-span-1'>
        <img src={member.data.avatar} className="w-14 rounded-full self-center aspect-square object-cover my-2"/>
        {member.data.votes == 0 ? <p className="relative top-[-25px]">✅</p> : <p className="relative top-[-25px]">🤔</p>}
        </div>
        <div className='col-span-3 self-center items-center'>
        <p className='text-left text-xl'>{member.data.Fname} {member.data.Lname}</p>
        </div>
        </div>
        ))}
        </div>
    );


}

export default FamilyMembersAside;
