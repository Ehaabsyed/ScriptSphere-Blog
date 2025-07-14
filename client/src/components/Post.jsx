import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Post() {
  const navigate = useNavigate()
  //verifying user
  const [Username, setUsername] = useState()
  useEffect(() => {
    const authcheck = async () => {
      await axios.get("http://localhost:5000/auth/me", { withCredentials: true })
        .then(async (response) => {
          if (response.data.status) {
            console.log(response.data);
            setUsername(response.data.user.Username)

          } else {
            toast.error("You are not Logged In")
            navigate("/")
          }

        })

    }
    authcheck()
  }, [])
  //useform 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  // post backend work
  const [blog, setblog] = useState({
    username: "",
    title: "",
    category: "",
    content: "",
    image:""
  })
  async function onSubmit(data) {
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success("Post successful")
    // console.log(data);
    const payload = {
      username: Username,
      title: data.title,
      category: data.category,
      content: data.content,
      image:data.image
    };
    axios.post("http://localhost:5000/post/createblog", { payload }, { withCredentials: true })
      .then(response => {
        console.log(response);

      })
      .catch(err => {
        console.log(err);
      })
    // console.log("send it to backend");

    reset()


  }



  return (
    <div className='min-h-[90.3vh] w-full blogsbg flex justify-center items-start md:items-center'>
      <form onSubmit={handleSubmit(onSubmit)} method='POST' className='min-h-[70vh] md:border-2 border-black rounded-2xl p-8 md:m-0 m-3 w-full md:w-1/2'>
        <div className="flex gap-3 justify-between">
          <input type="text" required placeholder='Enter title' className='w-full rounded-2xl border-2 border-gray-500 px-2 md:px-5 py-2 placeholder-black' {...register("title", { required: true })} />
          <input type="submit" disabled={isSubmitting} className='py-1 px-2 md:px-8 text-xl w-1/4   bg-[#42307D] text-white cursor-pointer rounded-full' value={isSubmitting ? "Posting" : "Post"} />
        </div>
        <div className='flex gap-5 mt-5'>
          <input type="text" required placeholder='Enter Category' className='w-full rounded-2xl border-2 border-gray-500 px-2 md:px-5 py-2 placeholder-black' {...register("category", { required: true })} />
          <input type="text" required placeholder='Enter Image url' className='w-full text-px] rounded-2xl border-2 border-gray-500 px-2 md:px-5 placeholder-black' {...register("image", { required: true })} />
        </div>
        <textarea placeholder='Whats on your mind?' className='w-full h-[600px] md:h-80 rounded-2xl placeholder-black p-3 mt-5 border-2 border-gray-500' {...register("content", { required: true })}></textarea>
      </form>
    </div>
  )
}

export default Post