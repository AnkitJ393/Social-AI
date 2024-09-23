import React from 'react'
import { CategoryProps } from './category';
import { cn } from '@/lib/utils';

const CategoryItem = ({name,value}:CategoryProps) => {
  return (
    <button className={cn('py-2 px-4 text-sm border rounded-full flex items-center cursor-pointer')}>
    {name}
    </button>
  )
}

export default CategoryItem;