import React from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-gray-600 flex justify-center items-center'>
    <div className='w-[20vw] h-[15vh] bg-zinc-400 flex rounded-md flex-col items-center justify-evenly'>
    <h1 className='text-[1.5vw] font-semibold tracking-tighter'>Thanks for visiting Us.</h1>
    <button
     onClick={() => navigate(-1)}
     className='px-3 py-2 rounded-md bg-[#6556CD] text-zinc-400'>See you Again🦁</button>
    </div>
    </div>
  )
}

export default Contact