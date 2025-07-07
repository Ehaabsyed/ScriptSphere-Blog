import React from 'react'
import { Link } from 'react-router'
import { FaHeart } from 'react-icons/fa';

function Profile() {
  return (
    <div className='min-h-[90.3vh] w-full blogsbg flex gap-5 flex-col justify-center items-center'>
      <div className="profile border w-1/4 mt-8 h-90 border-black rounded-4xl p-8 overflow-hidden">
        <div className="dp w-full flex flex-col justify-center items-center h-60">
          <img src="/default.jpg" className='w-50 rounded-full ' alt="" />
          <Link>Upload your profile picture</Link>
        </div>
        <div className="info flex flex-col justify-center items-center w-full">
          <h1 className='text-2xl font-bold'>Syed Mohammed Ehaab</h1>
          <h2 className='text-xl font-medium'>Username</h2>
        </div>
      </div>

      <div className="posts w-2/3 h-full p-4 flex flex-col justify-start items-center">
        <h1 className='text-2xl font-medium underline mb-10'>3 Posts</h1>


        <Link to="/view/id">
          <div className="blog w-full h-[220px] blog-shadow flex justify-center items-start gap-5 rounded-3xl">
            <img src="/bg-night.jpg" alt="" className='w-[35%] h-full rounded-3xl' />
            <div className="flex flex-col gap-1">
              <p className='text-gray-800 text-[15px]'>category</p>
              <h2 className='text-xl font-bold'>title</h2>
              <p className='text-[20px] overflow-hidden tracking-tight leading-6'>this is a pag freedompage wherer you can write a blog of your choice your freedompage wherer you can write a blog of your choice your freedompage wherer you can write a blog of your choice your freedom</p>
              <p className='text-[15px] text-gray-800'>12 june 1991</p>
              <div className="flex w-full justify-between items-center">
              <h3 className='text-xl text-red-700 font-medium'>10 Likes</h3>
              <div className="flex gap-2">
                <Link to="/edit/id">
              <h3 className='text-xl text-red-700 font-normal'>Edit</h3>
              </Link>
                <Link to="/delete/id">
              <h3 className='text-xl text-red-700 font-normal'>Delete</h3>
              </Link>
              </div>
              
              </div>
            </div>
          </div>
        </Link>

      </div>

    </div>
  )
}

export default Profile