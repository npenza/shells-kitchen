import React from 'react'
import { resetAllVotes } from '../utils/resetAllVotes'
export default function DebugResetButton() {
  return (
    <>
        <button onClick={() => resetAllVotes()} className='bg-red-300'>reset votes</button>
    </>
  )
}
