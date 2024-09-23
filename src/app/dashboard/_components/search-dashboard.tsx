'use client'

import Auth from '@/components/auth'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import Categories from './category'


const categories = [
    {
      name: "All",
      value: "All",
    },
    {
      name: "Youtube",
      value: "Youtube",
    },
    {
      name: "Instagram",
      value: "Instagram",
    },
    {
      name: "Tiktok",
      value: "Tiktok",
    },
    {
      name: "Linkedin",
      value: "Linkedin",
    },
    {
      name: "Tweet",
      value: "Tweet",
    },
  ];

const SearchDashboard = ({onSearchChange}:{onSearchChange:React.Dispatch<React.SetStateAction<string | undefined>> }) => {
  return (
    <div className='mx-5 py-2'>
        <div className="flex flex-col md:flex-row gap-2 mt-2 py-5 px-4 bg-white rounded">
            <div className="flex gap-2 items-center p-2 border rounded-full bg-white w-full md:w-[20%]">
                <SearchIcon/>
                <input type="text" placeholder='Search...' onChange={(e)=>onSearchChange(e.target.value)} className='bg-transparent outline-none text-black' />
            </div>
            <div className='ml-auto'>
                <Categories items={categories}/>
                <Auth/>
            </div>
        </div>

    </div>
  )
}

export default SearchDashboard