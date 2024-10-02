
import { NextResponse } from "next/server";
import axios from 'axios';
import { createHash } from 'crypto';



export async function POST(req:Request){
    
    let salt_key='099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    let merchant_id='PGTESTPAYUAT';
    const {name,amount,number,MID,transanction}=await req.json();


    const data={
            merchant_id:merchant_id,
            merchantTransactionId:transanction,
            amount:amount*100,
            name:name,
            redirectUrl:`http://localhost:3000/status?id=${transanction}`,
            redirectMode:'POST',
            mobileNumber:number,
            paymentInstrument:{
                type:'PAY_PAGE'

            }
         }

         console.log(data)

    const payload=JSON.stringify(data);
    const payloadMain=Buffer.from(payload).toString('base64');
    const keyIndex=1;
    const string=payloadMain+`/pg/v1/pay`+salt_key;
    const sha256=createHash('sha256').update(string).digest('hex');
    const checksum=sha256 + '###' + keyIndex;

    const prodURL='https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

    const options={
        method:'POST',
        url:prodURL,
        headers:{
            accept:'application/json',
            'Content-Type':'application/json',
            'X-VERIFY':checksum
        },
        data:{
            request:payloadMain
        }
    }

    const response=await axios (options);

    


}