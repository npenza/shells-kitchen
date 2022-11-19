import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { resetAllVotes } from '../utils/resetAllVotes'
export default function DebugResetButton() {

  // Load Redux Props
    const uid = useAuthStore((state) => state.uid)

    // Load Redux Methods
    const setVotes = useAuthStore((state) => state.setVotes)

  return (
    <>
        <button onClick={() => resetAllVotes(setVotes, uid)} className='bg-red-300'>reset votes</button>
    </>
  )
}
