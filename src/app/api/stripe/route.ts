import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{stripeAccount: process.env.STRIPE_ACCOUNT_ID});
const coupon = process.env.STRIPE_DISCOUNT_ID;
export async function POST(req: Request) {

    try {

        const { variantId, userId, type, email } = await req.json();
        const param: Stripe.Checkout.SessionCreateParams = {
            ui_mode: 'embedded',
            line_items: [
                {
                    price: variantId,
                    quantity: 1,
                },
            ],
            redirect_on_completion: 'never',
            automatic_tax: {enabled: true},
            client_reference_id: userId,
            customer_email: email,
           
            metadata: {
                userId: userId,
                priceId: variantId
            },
        }
        if(coupon){
            param.discounts = [{coupon: coupon}];
        }
        if(type === "0"){
            param.mode = 'payment';
            param.payment_intent_data = { metadata: { userId: userId, priceId: variantId } };
        }else if(type === "1"){
            param.mode = 'payment';
            param.payment_intent_data = { metadata: { userId: userId, priceId: variantId } };
        }else{
            param.mode = 'subscription';
            param.subscription_data = { metadata: { userId: userId, priceId: variantId } };
        }
        const session = await stripe.checkout.sessions.create(param);

        return NextResponse.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.log("payment error", error)
        return NextResponse.json({ error: 'payment error' }, { status: 500 });
    }
}