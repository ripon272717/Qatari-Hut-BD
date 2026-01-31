import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaCamera } from "react-icons/fa";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { useNavigate } from 'react-router-dom'; // রিডাইরেক্ট করার জন্য

const UserEditProfile = () => {
    const user = useSelector(state => state?.user?.user)
    const context = useContext(Context)
    const navigate = useNavigate()
    
    const [data, setData] = useState({
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        profilePic: user?.profilePic || "",
        password: ""
    })

    useEffect(() => {
        if(user){
            setData({
                name: user?.name,
                username: user?.username,
                email: user?.email,
                mobile: user?.mobile,
                profilePic: user?.profilePic,
                password: ""
            })
        }
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => ({
            ...preve,
            [name]: value
        }))
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)
        setData((preve) => ({
            ...preve,
            profilePic: imagePic
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const payload = { ...data }
        // যদি পাসওয়ার্ড বক্স খালি থাকে, তবে সেটি পাঠানোর দরকার নেই
        if(!payload.password){
            delete payload.password
        }

        const response = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            credentials: 'include'
        })

        const dataResponse = await response.json()

        if (dataResponse.success) {
            toast.success("প্রোফাইল সফলভাবে সেভ হয়েছে! ✅")
            context.fetchUserDetails() // নতুন ছবি ও নাম হেডারে দেখানোর জন্য
            
            // ২ সেকেন্ড পর হোম পেজে নিয়ে যাবে
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    return (
        <section className='pt-24 pb-10 min-h-[calc(100vh-100px)] bg-slate-50'>
            <div className='container mx-auto p-4 flex justify-center'>
                <div className='bg-white p-6 w-full max-w-lg shadow-xl rounded-lg border border-slate-200'>
                    <h2 className='text-2xl font-bold text-center text-slate-800 mb-6'>প্রোফাইল সেটিংস</h2>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        
                        {/* প্রোফাইল পিকচার সেকশন */}
                        <div className='flex flex-col items-center gap-2'>
                            <div className='w-32 h-32 bg-slate-100 rounded-full border-4 border-red-600 relative group overflow-hidden shadow-inner'>
                                {
                                    data.profilePic ? (
                                        <img src={data.profilePic} className='w-full h-full object-cover' alt="Profile" />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center text-5xl text-slate-400'>
                                            <FaCamera />
                                        </div>
                                    )
                                }
                                <label className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300'>
                                    <FaCamera className='text-2xl' />
                                    <span className='text-xs mt-1 font-medium'>পরিবর্তন</span>
                                    <input type='file' className='hidden' onChange={handleUploadPic} />
                                </label>
                            </div>
                        </div>

                        {/* ইনপুট ফিল্ডস */}
                        <div className='space-y-4 mt-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-slate-600 ml-1'>আপনার নাম:</label>
                                    <input type='text' name='name' value={data.name} onChange={handleOnChange} className='bg-slate-50 p-3 rounded-lg outline-none border focus:border-red-600 transition-all' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-slate-600 ml-1'>ইউজারনেম:</label>
                                    <input type='text' name='username' value={data.username} onChange={handleOnChange} className='bg-slate-50 p-3 rounded-lg outline-none border focus:border-red-600 transition-all' />
                                </div>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold text-slate-600 ml-1'>ইমেইল (স্থায়ী):</label>
                                <input type='email' value={data.email} disabled className='bg-slate-200 p-3 rounded-lg border cursor-not-allowed text-slate-500' />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold text-slate-600 ml-1'>মোবাইল নম্বর:</label>
                                <input type='text' name='mobile' value={data.mobile} onChange={handleOnChange} className='bg-slate-50 p-3 rounded-lg outline-none border focus:border-red-600 transition-all' />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold text-red-600 ml-1'>পাসওয়ার্ড পরিবর্তন (প্রয়োজন হলে):</label>
                                <input type='password' name='password' value={data.password} onChange={handleOnChange} placeholder="পাসওয়ার্ড পাল্টাতে চাইলে এখানে লিখুন" className='bg-slate-50 p-3 rounded-lg outline-none border focus:border-red-600 transition-all shadow-sm' />
                            </div>
                        </div>

                        <button className='bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 font-bold shadow-lg transform hover:scale-[1.02] transition-all mt-6'>
                            সব তথ্য সেভ করুন
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UserEditProfile