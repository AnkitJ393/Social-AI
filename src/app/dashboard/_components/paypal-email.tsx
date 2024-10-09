import { Copy } from 'lucide-react';
import React, { useState } from 'react'

const PaypalEmail = () => {

    const [showPassword,setShowPassword]=useState(false);
    const [toolTipMessage,setTooltipMessage]=useState('');

    const togglePasswordVisibility=()=>{
      setShowPassword((prev:boolean)=>!prev)
    }
  
    const copyToClipboard = (text:string,type:string) => {
      navigator.clipboard.writeText(text).then(() => {
        if(type==='Email'){
          setTooltipMessage('Email Copied!');
        }
        else{
          setTooltipMessage('Password Copied!')
        }
        
        setTimeout(() => setTooltipMessage(''), 2000); // Hide tooltip after 2 seconds
      });
    };
  
  return (
    <div className="mx-auto w-max h-[100px] border ">
    <p className="mb-2">Email: <span className="font-bold">sb-9u47eo31387011@business.example.com </span>
       <Copy style={{display:'inline'}} width={12} height={12} onClick={()=>copyToClipboard('sb-9u47eo31387011@business.example.com','Email')}/>
    </p> 
    <p>
    Password: 
      <span className="ml-2 mr-8">
        {showPassword ? 'twMY:!7.' : '••••••••'}
      </span>
      <Copy style={{display:'inline'}} width={12} height={12} onClick={()=>copyToClipboard('twMY:!7.','Password')}/>
      
    <button 
      onClick={togglePasswordVisibility} 
      className="bg-blue-500 hover:bg-blue-700 ml-5 text-white   py-0.2 px-4 rounded"
      >
      {showPassword ? 'Hide Password' : 'Show Password'}
    </button>
      </p>
      {toolTipMessage && <span className="text-center mt-3 text-green-500 font-extrabold">{toolTipMessage}</span>}
  </div>
  )
}

export default PaypalEmail