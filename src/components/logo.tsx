import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { MuseoModerno} from 'next/font/google';

const  museo=MuseoModerno({
    weight:'700',
    subsets:['latin'],
    
})
const  Logo = () => {
  return (
        <Link href='/' className='flex flex-col items-center'>
            <Image alt='logo' src='/logo.svg' width={60} height={60}/>
            <h1 style={{fontSize:'1.2rem' , wordSpacing:'10px'} } className={museo.className}>Social <span style={{fontSize:'2rem'}}>AI</span></h1>
        </Link>
  )
}

export default Logo;
