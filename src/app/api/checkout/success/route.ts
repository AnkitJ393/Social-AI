import { NextRequest, NextResponse } from "next/server";
import paypal from 'paypal-rest-sdk';
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

paypal.configure({
  mode: 'sandbox', 
  client_id: process.env.PAYPAL_CLIENT_ID as string,
  client_secret: process.env.PAYPAL_SECRET as string,
});

export async function GET(req: NextRequest) {
    const PayerID = req.nextUrl.searchParams.get('PayerID');
    const paymentId = req.nextUrl.searchParams.get('paymentId');
    
    const userId=auth();
    const user = await currentUser();

    console.log(userId);


   await db.purchase.create({
        data:{
            userId:userId.userId,
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
        total: '1.00',
      },
    }],
  };

  try {
    const payment:any = await new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId as string, execute_payment_json, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    if(payment.state==='approved'){

        let paypalCustomer=await db.paypalCustomer.findUnique({
            where:{
                userId:userId.userId
            },
            select:{
                paypalCustomerId:true
            }
        })
    
        if(!paypalCustomer){
             await db.paypalCustomer.create({
                data: {
                  userId: userId.userId,
                  paypalCustomerId: payment.id  ,
                },
              });
            }
        }

        const findUserByUserID = await db.user.findUnique({
            where: {
              userId: userId.userId,
            },
          });
    
          if (!findUserByUserID) {
            await db.user.create({
              data: {
                userId: userId.userId,
                totalCredit: 10000 + 10000,
              },
            });
          } else {
            await db.user.update({
              where: {
                userId: userId.userId,
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
