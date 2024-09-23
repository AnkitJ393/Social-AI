import React, { ReactNode } from 'react'
import Sidebar from './_components/sidebard'

const DashboardLayout = ({children }:Readonly<{children:ReactNode}>) => {
  return (
    <div className='bg-gray-50 h-screen'>
        <div className="md:w-64 md:block fixed">
            <Sidebar />
        </div>
        <div className='md:ml-64 bg-gray-50 h-fit pb-5'>{children}</div>        
    </div>
  )
}

export default DashboardLayout