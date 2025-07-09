import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import axios, { Axios } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
function Signup() {
  const navigate=useNavigate()
  //useform 
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    reset
  } = useForm();
  //function onsubmit
  async function onSubmit(data) {
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log(data);
    axios.post("http://localhost:5000/auth/signup",{data})
    .then(response=>{
      if(response.data.status){
         navigate("/")
      }else{
        toast.error("User already Exists!")
        console.log(response)
      }
    })
    .catch(err=>{
      console.log(err);   
    })
    // console.log("send it to backend");
    
    reset()
  }

  return (
    <div className='max-h-screen  w-full relative'>
      <video src="/smokebg.mp4" muted loop playsInline autoPlay className='img h-screen object-cover w-full absolute top-0 left-0' alt="" />
      <div className="logo text-6xl text-white font-semibold absolute top-10 left-[50%] -translate-x-[50%] ">ScriptSphere</div>
      <div className="setup absolute left-0 top-40 h-[75vh] w-[90vw] flex gap-10">

        <div className="form flex justify-center items-center h-[75vh] w-full">
          <form onSubmit={handleSubmit(onSubmit)} method='POST' className='flex flex-col box-shadow gap-[12px] text-white h-full w-[30vw] rounded-4xl border-2 border-white text-xl items-start  py-10 px-8 justify-center'>
            <label htmlFor="name" className='text-xl'>Name</label>
            <input type="text" placeholder='Name' className='py-1 px-3 w-full border-white border rounded-full'
              {...register("name", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.name && <p className='text-red-500 text-xs font-medium ml-3'>{errors.name.message}</p>}
            <label className='text-xl'>username</label>
            <input type="text" placeholder='Username' className='py-1 px-3 w-full border-white border rounded-full' 
            {...register("username", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.username && <p className='text-red-500 text-xs font-medium ml-3'>{errors.username.message}</p>}
            <label htmlFor="email" className='text-xl'>Email</label>
            <input type="email" placeholder='Email' className='py-1 px-3 w-full border-white border rounded-full' 
            {...register("email", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.email && <p className='text-red-500 text-xs font-medium ml-3'>{errors.email.message}</p>}
            <label htmlFor="password" className='text-xl'>Password</label>
            <input type="password" placeholder='Password' className='py-1 px-3 w-full border-white border rounded-full' 
            {...register("password", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.password && <p className='text-red-500 text-xs font-medium ml-3'>{errors.password.message}</p>}
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Signing up" : "Sign Up"} className='rounded-full ml py-1 px-3 border-none bg-blue-700 text-white' />
            <p className='text-[18px]'>Already have an account? <Link to="/" className='text-[#3c00ff] font-bold'>Sign In</Link></p>

          </form>
        </div>
        <div className="quote flex flex-col gap-4  border-white max-w-[40vw]">
          <h1 className='text-6xl mt leading-24 font-bold text-white'>New User!</h1>
          <p className='text-2xl mt text-white font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit. Voluptates illum officiis iure dio.</p>
        </div>
      </div>
    </div>
  )
}

export default Signup