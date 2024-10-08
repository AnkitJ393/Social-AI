import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';
import AIChart from './ai-chart';

const AIUsage = async ()=> {

    const userId = auth()?.userId ?? ''; // Set an empty string or handle it appropriately
if (!userId) {
  throw new Error("No valid user ID found.");
}

    if(!userId){
        revalidatePath('/');
    }
    
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

   const  availableCredit=userCredit ? Number(userCredit?.totalCredit) : 100000;

    return (
        <div className="bg-white">
          <AIChart availableCredit={availableCredit-totalUsage} totalUsage={totalUsage} />
        </div>
      );
}

export default AIUsage