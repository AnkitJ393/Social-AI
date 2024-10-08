import { NextRequest, NextResponse } from "next/server";
import paypal from 'paypal-rest-sdk';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

paypal.configure({
  mode: 'sandbox', 
  client_id: process.env.PAYPAL_CLIENT_ID as string,
  client_secret: process.env.PAYPAL_SECRET as string,
});

export async function GET(req: NextRequest) {
    const PayerID = req.nextUrl.searchParams.get('PayerID');
    const paymentId = req.nextUrl.searchParams.get('paymentId');
    
    const userId=auth();
  

   await db.purchase.create({
        data:{
            userId: userId?.userId || "defaultUserId",
            credit:10000,
        }
    });


  if (!PayerID || !paymentId) {
    return new NextResponse('Payment parameters missing', { status: 400 });
  }

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [{
      amount: {
        currency: 'USD',
        total: '10.00',
      },
    }],
  };

  try {
    const payment:paypal.PaymentResponse = await new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId as string, execute_payment_json, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    if(payment.state==='approved'){

        const paypalCustomer=await db.paypalCustomer.findUnique({
            where:{
                userId: userId?.userId || "defaultUserId"
            },
            select:{
                paypalCustomerId:true
            }
        })
    
        if(!paypalCustomer){
             await db.paypalCustomer.create({
                data: {
                  userId:  userId?.userId || "defaultUserId",
                  paypalCustomerId: payment?.id || 'paymentId'  ,
                },
              });
            }
        }

        const findUserByUserID = await db.user.findUnique({
            where: {
              userId:  userId?.userId || "defaultUserId",
            },
          });
    
          if (!findUserByUserID) {
            await db.user.create({
              data: {
                userId:  userId?.userId || "defaultUserId",
                totalCredit: 10000 + 10000,
              },
            });
          } else {
            await db.user.update({
              where: {
                userId:  userId?.userId || "defaultUserId",
              },
              data: {
                totalCredit: findUserByUserID.totalCredit + 10000,
              },
            });
          };
          console.log(payment );
      
          const redirectUrl = `${req.nextUrl.origin}/dashboard`; // Origin contains the protocol and domain
      
          return NextResponse.redirect(redirectUrl); // Redirect to absolute URL
    }


   catch (error) {
    console.error('Payment execution error:', error);
    return new NextResponse('Payment failed', { status: 500 });
  }
}
