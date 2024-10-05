'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contentTemplates } from '@/lib/content-template';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import Editor from '../_components/editor';
import { chatSession } from '@/lib/gemini-ai';

interface templateSlugProps{
    templateSlug:string;
}

const TemplatePage = ({params}:{params:templateSlugProps}) => {

    const selectedTemplate=contentTemplates.find((item)=>item.slug===params.templateSlug);
    const [isLoading,setIsLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('');

    const generateAiContent=async(formData:FormData)=>{
      setIsLoading(true);

      try{
        let dataSet=
        {
            title:formData.get('title'),
            description:formData.get('description')
        }

        const selectedPrompt=selectedTemplate?.aiPrompt;
        const finalAIprompt=JSON.stringify(dataSet)+", "+selectedPrompt;

        

        const result=await chatSession.sendMessage(finalAIprompt);
        setAiOutput(result.response.text());

        const response = await fetch('/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
              title: dataSet.title, 
              description: result.response.text(), 
              templateUsed: selectedTemplate?.name
          })
      });
    
        setIsLoading(false);
      }
      catch(error){
        console.log(error);
        
      }
    };

    const onSubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
      
      event.preventDefault();

      const formData=new FormData(event.currentTarget);
      generateAiContent(formData);
    }

  return (
    <div className='mx-5 py-2'>
      <div className='mt-5 py-6 px-4 bg-white rounded'>
        <h1 className='font-large' >{selectedTemplate?.name}</h1>
      </div>  

      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 p-5 mt-5 bg-white">
            {selectedTemplate?.form?.map((form)=>{
                return (
                    <div key={selectedTemplate.slug}>
                        <label>{form.label}</label>
                        {form.field ==='input'  ? (
                            <div className='mt-5'>
                                <Input name='title'></Input>
                            </div>
                        ) :
                            <div className='mt-5'><Textarea name='description'/></div>
                        }
                    </div>

                )
            })}
        </div>

        <Button className='mt-5' type='submit'>{isLoading ? (<Loader className='animate-spin'> </Loader>) : ('Generate Content')}</Button>
      </form>
      <div className='mt-10 mb-10'>
        <Editor value={isLoading ? 'Generating...': aiOutput}/>
      </div>
    </div>
  )
}

export default TemplatePage