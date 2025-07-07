import React from 'react'

function Post() {
  return (
    <div className='min-h-[90.3vh] w-full blogsbg flex justify-center items-center'>
      <form action="" className='min-h-[70vh] border-2 border-black rounded-2xl p-8 w-1/2'>
        <div className="flex gap-3 justify-between">
          <input type="text" placeholder='Enter title' className='w-3/5 rounded-2xl border-2 border-gray-500 px-5 placeholder-black' />
          <input type="text" placeholder='Enter Category' className='w-40 rounded-2xl border-2 border-gray-500 px-5 placeholder-black' />
          <input type="submit" className='py-1 px-8 text-xl  bg-[#42307D] text-white cursor-pointer rounded-full' value="Post" />
        </div>
        <textarea placeholder='Whats on your mind?' className='w-full h-80 rounded-2xl placeholder-black p-3 mt-5 border-2 border-gray-500'></textarea>
      </form>
    </div>
  )
}

export default Post