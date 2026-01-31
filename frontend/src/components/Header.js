import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
    }

    return (
        <header className='h-20 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div>
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search} />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
                        <GrSearch />
                    </div>
                </div>

                <div className='flex items-center gap-7'>
                    <div className='relative flex flex-col items-center justify-center'>
                        {
                            user?._id && (
                                <div className='flex flex-col items-center'>
                                    {/* প্রোফাইল পিকচার বড় করা হয়েছে (w-12 h-12) */}
                                    <div className='w-12 h-12 cursor-pointer relative flex justify-center border rounded-full overflow-hidden shadow-sm' onClick={() => setMenuDisplay(preve => !preve)}>
                                        {
                                            user?.profilePic ? (
                                                <img src={user?.profilePic} className='w-full h-full object-cover' alt={user?.name} />
                                            ) : (
                                                <div className='text-4xl'><FaRegCircleUser /></div>
                                            )
                                        }
                                    </div>
                                    <p className='text-[12px] font-bold text-slate-700 mt-1 capitalize'>{user?.username || user?.name}</p>
                                </div>
                            )
                        }

                        {
                            menuDisplay && (
                                <div className='absolute bg-white top-16 p-2 shadow-lg rounded min-w-[150px] z-50 border'>
                                    <nav className='flex flex-col'>
                                        {/* এডিট প্রোফাইল অপশন */}
                                        <Link to={"/user-details"} className='whitespace-nowrap hover:bg-slate-100 p-2 text-sm' onClick={() => setMenuDisplay(false)}>Edit Profile</Link>
                                        
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2 text-sm' onClick={() => setMenuDisplay(false)}>Admin Panel</Link>
                                            )
                                        }
                                        <button onClick={handleLogout} className='block text-left hover:bg-slate-100 p-2 text-sm text-red-600 font-semibold'>Logout</button>
                                    </nav>
                                </div>
                            )
                        }
                    </div>

                    {
                        user?._id && (
                            <Link to={"/cart"} className='text-2xl relative'>
                                <span><FaShoppingCart /></span>
                                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }

                    <div className='hidden md:block'>
                        {
                            !user?._id && (
                                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all'>Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header