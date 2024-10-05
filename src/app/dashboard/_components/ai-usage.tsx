import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';
import React from 'react'
import AIChart from './ai-chart';

const AIUsage = async ()=> {

    const {userId}=auth();

    console.log(userId);

    if(!userId){
        revalidatePath('/');
    }
    
    let availableCredit;
    let totalUsage:number=0;

    const userAIOutput=await db.aIOutput.findMany({
        where:{
            userId:userId as string
        }
    });

    if(userAIOutput.length>0){
        userAIOutput.forEach((output)=>{
            totalUsage=totalUsage+Number(output?.description.length)
        })

        revalidatePath('/');
    }

    const userCredit=await db.user.findUnique({
        where:{userId:userId as string}
    })

    availableCredit=userCredit ? Number(userCredit?.totalCredit) : 10000;

    console.log('totalusage'+totalUsage,availableCredit)

    return (
        <div className="bg-white">
          <AIChart availableCredit={availableCredit} totalUsage={totalUsage} />
        </div>
      );
}

export default AIUsage