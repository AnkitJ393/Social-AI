import React from 'react'
import { CategoryProps } from './category';
import { cn } from '@/lib/utils';
import {useRouter, usePathname, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const CategoryItem = ({name,value}:CategoryProps) => {
    const pathname=usePathname();
    const router=useRouter();
    const searchParams=useSearchParams();

    const currentCategory=searchParams.get('category');

    const isSelected=currentCategory ===value;

    const handleOnClick=()=>{
        const url=qs.stringifyUrl({
            url:pathname,
            query:{
                category:isSelected?null:value
            }
        },
        {
            skipNull:true ,
            skipEmptyString:true

        }
        
        );

        router.push(url)
    }

  return (
    <button onClick={handleOnClick} className={cn('py-2 px-4 text-sm border rounded-full flex items-center cursor-pointer')}>
    {name}
    </button>
  )
}

export default CategoryItem;