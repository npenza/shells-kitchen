import React from 'react';

const AsideStat = ({stat , asideText}) => {
    return (
        <div className='flex my-2'>
        <div className='bg-[#354c2e] text-white font-medium py-2 px-4 pr-5 rounded-l-lg rounded-r-2xl min-w-[12em]'>
        <p className='text-lg'>{asideText}</p>
        </div>
          <p className='text-center m-auto font-extrabold'>{stat}</p>
        </div>
    );
}

export default AsideStat;
