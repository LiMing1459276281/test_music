import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'
import { IOrderDetail, createOrderDetailsFromStripe, refundedOrderDetailsFromStripe } from "@/actions/stripe-billing";
import { setKeyWithExpiry, getKey } from "@/lib/vercel-kv-client";
import Stripe from 'stripe';

const expirySeconds = 60 * 60 * 1; // 1 hour

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {

    try {
        if (!webhookSecret) {
            return new Response("Stripe Webhook Secret not set in .env", {
                status: 500,
            });
        }

        const body = await request.text();
        const payload = JSON.parse(body);


        const headerPayload = headers();
        const signature = headerPayload.get('stripe-signature') || '';

        let event = null;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            );
        } catch (err) {
            return new Response('Invalid signature.', {
                status: 400
            })
        }

        const webhook_id = await getKey(event.id);
        if(webhook_id){
          return new Response('Error occured -- webhook already', {
            status: 200
          })
        }
        await setKeyWithExpiry(event.id, '1',expirySeconds);
        // console.log("Event:", event);

        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
                break;
            // case 'invoice.paid':
            //     await handleInvoicePaid(event.data.object as Stripe.Invoice); //subscription
            //     break;
            case 'charge.refunded':
                await handleRefund(event.data.object as Stripe.Charge);
                break;
            default:
                //console.log("Unhandled event:",data);
                //throw new Error(`Unhandled event: ${eventName}`);
                return new Response(`Unhandled event: ${event.type}`, {
                    status: 400,
                });
        }

        return new Response('', { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return new Response(`Webhook error: ${error}`, {
            status: 400,
        });
    }
}



async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {

    //console.log(data);
    const transaction_id = paymentIntent.payment_method as string; // stripe transaction id
    const user_id = paymentIntent.metadata.userId; // login user id
    const invoice = paymentIntent.invoice as string; // stripe invoice id
    const priceId = paymentIntent.metadata.priceId; // price id
    const orderDetails: IOrderDetail = {
        userId: user_id,
        transactionId: transaction_id,
        invoice: invoice,
        priceId: priceId
    };
    await createOrderDetailsFromStripe(orderDetails);
}
// async function handleInvoicePaid(invoice: Stripe.Invoice) {
//     console.log("invoice",invoice);
    
// }

async function handleRefund(charge: Stripe.Charge) {
    //console.log(charge);
    const transaction_id = charge.payment_method as string; // stripe transaction id
    const user_id = charge.metadata.userId; // login user id
    const invoice = charge.invoice as string; // stripe invoice id
    const priceId = charge.metadata.priceId; // price id
    const orderDetails: IOrderDetail = {
        userId: user_id,
        transactionId: transaction_id,
        invoice: invoice,
        priceId: priceId
    };
    await refundedOrderDetailsFromStripe(orderDetails);
}


export async function GET(request: NextRequest) {
    return new Response("", { status: 200 });
}