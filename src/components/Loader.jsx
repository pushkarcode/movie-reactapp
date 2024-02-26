import React from 'react'
import loding from "/loader.gif"

const Loader = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='h-[50%] object-cover' src={loding}/>
    </div>
  )
}

export default Loader