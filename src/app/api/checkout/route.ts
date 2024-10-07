import { NextResponse } from "next/server";
import paypal from 'paypal-rest-sdk';

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID as string,
    client_secret: process.env.PAYPAL_SECRET as string,
});


export async function POST(){

    try {
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `http://${process.env.VERCEL_URL}/api/checkout/success`,
                cancel_url: `http://${process.env.VERCEL_URL}`,
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: 'item',
                                sku: 'item',
                                price: '10.00',
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: '10.00',
                    },
                    description: 'Social AI Credit purchase.',
                },
            ],
        };

    
        const payment = await new Promise <paypal.PaymentResponse>((resolve, reject) => {
            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });

        
        const approvalURL = payment.links?.find((link: any) => link.rel === 'approval_url');

        if (approvalURL) {
            return NextResponse.json({ approvalURL: approvalURL.href }, { status: 200 });
        } else {
            return new NextResponse('Approval URL not found', { status: 500 });
        }
    } catch (error) {
        console.error('Error creating payment:', error);
        return new NextResponse('Payment creation failed', { status: 500 });
    }
}
