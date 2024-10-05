import { NextRequest, NextResponse } from "next/server";
import paypal from 'paypal-rest-sdk';
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID as string,
    client_secret: process.env.PAYPAL_SECRET as string,
});

export async function POST(req: NextRequest) {
    const userId=auth();
    const user = await currentUser();

    try {
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://localhost:3000/api/checkout/success',
                cancel_url: 'http://localhost:3000/api/checkout/failed',
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: 'item',
                                sku: 'item',
                                price: '1.00',
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: '1.00',
                    },
                    description: 'This is the payment description.',
                },
            ],
        };

    
        // Wrap PayPal callback in a Promise
        const payment:any = await new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, (error: any, payment: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });

        // Extract approval URL from the payment object
        const approvalURL = payment.links.find((link: any) => link.rel === 'approval_url');

        // If approval URL exists, send it as a response
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
