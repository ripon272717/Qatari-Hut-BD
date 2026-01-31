import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
      name: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      profilePic: "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
      const { name, value } = e.target
      setData((preve) => ({ ...preve, [name]: value }))
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    setData((preve) => ({ ...preve, profilePic: imagePic }))
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()
        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate("/login")
        } else {
            toast.error(dataApi.message)
        }
      } else {
        toast.error("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি!")
      }
  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md rounded'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full border'>
                    <img src={data.profilePic || loginIcons} alt='profile' className='w-full h-full object-cover'/>
                    <label>
                        <div className='text-[10px] bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>Upload</div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'><label>Name :</label><div className='bg-slate-100 p-2'><input type='text' placeholder='Enter Name' name='name' value={data.name} onChange={handleOnChange} required className='w-full outline-none bg-transparent'/></div></div>
                    <div className='grid'><label>Username :</label><div className='bg-slate-100 p-2'><input type='text' placeholder='Enter Username' name='username' value={data.username} onChange={handleOnChange} required className='w-full outline-none bg-transparent'/></div></div>
                    <div className='grid'><label>Email :</label><div className='bg-slate-100 p-2'><input type='email' placeholder='Enter Email' name='email' value={data.email} onChange={handleOnChange} className='w-full outline-none bg-transparent'/></div></div>
                    <div className='grid'><label>Mobile :</label><div className='bg-slate-100 p-2'><input type='text' placeholder='Enter Mobile' name='mobile' value={data.mobile} onChange={handleOnChange} className='w-full outline-none bg-transparent'/></div></div>
                    
                    <div>
                        <label>Password :</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnChange} required className='w-full outline-none bg-transparent'/>
                            <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password :</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange} required className='w-full outline-none bg-transparent'/>
                            <div className='cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}</div>
                        </div>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sign Up</button>
                </form>
                <p className='my-4 text-sm'>Already have account? <Link to={"/login"} className='text-red-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}
export default SignUp