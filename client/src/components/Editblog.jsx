import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
function Editblog() {
  const navigate=useNavigate()
  useEffect(() => {
    const authcheck=async ()=>{
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true })
      .then(async (response)=>{
        if(response.data.status){
          console.log(response.data);
          
        }else{
          toast.error("You are not Logged In")
          navigate("/")
        }
        
      })
      
    }
    authcheck()
  
  }, [])
  return (
    <div className='min-h-screen w-full blogsbg flex justify-center items-center'>
      <form action="" className='min-h-[70vh] border-2 border-black rounded-2xl p-8 w-1/2'>
        <div className="flex gap-3 justify-between">
          <input type="text" placeholder='Enter title' className='w-3/5 rounded-2xl border-2 border-gray-500 px-5 placeholder-black' />
          <input type="text" placeholder='Enter Category' className='w-40 rounded-2xl border-2 border-gray-500 px-5 placeholder-black' />
          <input type="submit" className='py-1 px-8 text-xl  bg-[#42307D] text-white cursor-pointer rounded-full' value="Edit" />
        </div>
        <textarea placeholder='Whats on your mind?' className='w-full h-80 rounded-2xl placeholder-black p-3 mt-5 border-2 border-gray-500'></textarea>
      </form>
    </div>
  )
}

export default Editblog