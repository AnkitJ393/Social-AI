'use client'

import {useEffect,useState} from 'react'
import { contentTemplates } from '@/lib/content-template'
import Link from 'next/link'

const TemplateList = ({searchInput}:{searchInput:string |undefined}) => {

    const [templateList, setTemplateList] = useState(contentTemplates);

    useEffect(()=>{
        console.log(searchInput);
        if(searchInput && searchInput.length > 2){
            const filteredTemplates=contentTemplates.filter((item)=>
                item.name.toLowerCase().includes(searchInput.toLowerCase())
            );

            setTemplateList(filteredTemplates);
        }
        else{
            setTemplateList(contentTemplates);
        }
    },[searchInput])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-5 mt-5'>
        {templateList.map((template)=>(
            <div key={template.slug}>
                <Link href={`dashboard/${template.slug}`} className='bg-white w-full rounded-lg h-[200px] py-4 px-4 text-center flex flex-col justify-center'>
                    <template.icon className='h-12 w-12 mx-auto'></template.icon>
                    <h2 className='font semibold mt-5'>{template.name}</h2>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default TemplateList