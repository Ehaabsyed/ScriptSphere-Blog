import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Blogs from './components/Blogs.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Post from './components/Post.jsx'
import View from './components/View.jsx'
import Profile from './components/Profile.jsx'
import Profileid from './components/Profileid.jsx'
import Editblog from './components/Editblog.jsx'
import {Toaster} from 'react-hot-toast'
import Upload from './components/Upload.jsx'

const router=createBrowserRouter([
  //home page
  {
    path:"/blogs",
    element:<><Navbar/><Blogs/></>
  },
  //create a blog
  {
    path:"/create",
    element:<><Navbar/><Post/></>
  },
  //view a blog
  {
    path:"/view/:id",
    element:<><View/></>
  },
  //view profile
  {
    path:"/profile",
    element:<><Navbar/><Profile/></>
  },
  // upload profile photo
  {
    path:"/upload/:email",
    element:<><Upload/></>
  },
  //view others profile
  {
    path:"/profile/:id",
    element:<><Navbar/><Profileid/></>
  },
  //login
  {
    path:"/",
    element:<Login/>
  },
  // signup
  {
    path:"/signup",
    element:<Signup/>
  },
  //edit blog
  {
    path:"/edit/id",
    element:<Editblog/>
  },
  //diff routes
  {
    path:"*",
    element: <h1 className='text-[100px]'>ENTER VALID ROUTE</h1>
  }
])
createRoot(document.getElementById('root')).render(
      <>
      <RouterProvider router={router} />
      <Toaster/>
      </>
)
