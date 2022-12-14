import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { resetAllVotes } from '../utils/resetAllVotes'
export default function DebugResetButton() {

  // Load Redux Props
    const uid = useAuthStore((state) => state.uid)
  const SuperAdmin = useAuthStore((state) => state.SuperAdmin)


    // Load Redux Methods
    const setVotes = useAuthStore((state) => state.setVotes)

  return (
   <>
    { SuperAdmin &&
        <button className='bg-red-700 text-white px-3 py-1 rounded-md' onClick={() => resetAllVotes(setVotes, uid)}>Reset</button>
    } </> 
  )
}
