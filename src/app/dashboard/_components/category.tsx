import React from 'react'
import CategoryItem from './category_item';


export interface CategoryProps{
    name:string;
    value:string;
}

const Categories = ({items}:{items : CategoryProps[]}) => {
  return (
    <div className='flex gap-2 flex-wrap'>
        {items.map((category)=>(
            <CategoryItem name={category.name} key={category.name} value={category.value}>                
            </CategoryItem>
        ))}
    </div>
  )
}

export default Categories