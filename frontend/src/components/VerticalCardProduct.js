import React from 'react'
import { Link } from 'react-router-dom'

const VerticalCardProduct = ({ data = [], loading }) => {
    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
            {
                loading ? (
                    <p>Loading...</p> // এখানে তোর স্কেলিটন লোডার দিতে পারিস
                ) : (
                    // এখানে data?.map ব্যবহার করা হয়েছে যাতে undefined এরর না আসে
                    data?.map((product, index) => {
                        return (
                            <Link to={"product/" + product?._id} key={product?._id || index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' alt={product?.productName}/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{ product?.sellingPrice }</p>
                                        <p className='text-slate-500 line-through'>{ product?.price }</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
    )
}

export default VerticalCardProduct