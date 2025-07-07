import React from 'react'
import { Link } from 'react-router'
import { FaHeart } from 'react-icons/fa';
function Blogs() {
  return (
    <div className='min-h-[calc(100vh-70px)] blogsbg overflow-hidden'>
      <div className="input h-40 w-full  flex flex-col items-center justify-center gap-3">
        <h1 className='text-4xl text-[#42307D] font-bold'>Resources And Insights</h1>
        <h4 className='text-2xl text-[#7665ac] font-normal'>The lates industry news, interviews, technologies, and resources</h4>
        <div className="input-search flex gap-1">
          <input type="text" placeholder='search' className='py-[18px] px-8 border-2 placeholder-black border-gray-600 rounded-full w-100 pl-[40px]' />
          <input type="submit" className='py-2 px-3  bg-[#42307D] text-white cursor-pointer rounded-full' value="search" />
          <img src="/search.svg" className='absolute top-[25.6%] left-[34.8%] text-gray-500 h-6' alt="" />
        </div>
      </div>
      <div className="blogs w-full h-full flex flex-wrap gap-5 justify-start items-center">
        <Link to="/view/id">
        <div className="blog w-[350px] h-[400px] blog-shadow flex flex-col rounded-3xl">
          <img src="/bg-night.jpg" alt="" className='h-[50%] w-full rounded-3xl' />
          <p className='text-gray-600 text-[15px]'>category</p>
          <h2 className='text-xl font-medium'>title</h2>
          <p className='text-[18px] overflow-hidden tracking-tight leading-5'>this is a page wherer you can write a blog of your choice your freedom</p>
          <div className="userinfo flex h-fit gap-5 mt-3 bg-transparent items-center">
           <Link to="/profile/id"> <img src="/default.jpg" className='h-10 rounded-full img' alt="" /></Link>
            <div className="info">  
            <Link to="/profile/id"><h5 className='text-[18px]'>ehaabsyed</h5></Link>
              <p className='text-[14px] text-gray-600'>12 june 2025</p>
            </div>
            <div className="likes ml-31 ">
              <FaHeart className='text-2xl text-red-600'/>
            </div>
          </div>
        </div> 
        </Link>

        
        
        
        


      </div>
      <footer className='h-14 w-full bg-[#8378a7] border-t-4 border-[#42307D] flex justify-center items-center text-[18px] text-[#311c77]'>
        Ehaabsyed-2025 || ScriptSphere
      </footer>
    </div>
  )
}

export default Blogs