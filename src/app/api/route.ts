import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const{userId}=auth();
        if(!userId){
            return new NextResponse('User not Authenticated',{status:401});
        }

        const {title,description,templateUsed}=await req.json();
        

        const createNewOutput=await db.aIOutput.create({
                data:{
                    userId:userId,
                    title:title,
                    description:description,
                    templateUsed:JSON.stringify(templateUsed) 
                }
        });
        

        revalidatePath('/');
        return NextResponse.json(createNewOutput)
    }
    catch(error){
        console.log(error)
        return new NextResponse('POST AI GENERATE:New Output Generation Error' ,{status:500});
    }
    
}