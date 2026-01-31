import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ identifier: "", password: "" })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => ({ ...preve, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()
        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        } else {
            toast.error(dataApi.message)
        }
    }

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md rounded'>
                    <div className='w-20 h-20 mx-auto'><img src={loginIcons} alt='login'/></div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email / Username / Mobile :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type='text' name='identifier' value={data.identifier} onChange={handleOnChange} placeholder='Enter here' className='w-full outline-none bg-transparent'/>
                            </div>
                        </div>
                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnChange} className='w-full outline-none bg-transparent'/>
                                <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-xs mt-1'>Forgot password?</Link>
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                    </form>
                    <p className='my-5 text-sm'>Don't have account? <Link to={"/sign-up"} className='text-red-600 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}
export default Login