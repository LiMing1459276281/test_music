import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import AuthContext from "@/components/customUI/auth-context";
import { findUserCreditsByClerkId } from "@/actions/user";
import { useContext } from "react";

interface CheckoutProps{
  variantId:string;
  mode:string;
  userId:string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm({variantId,mode,userId}:CheckoutProps) {

  const { auth, setAuth } = useContext(AuthContext);

  async function handlePaymentSuccess(){
    console.log('payment success');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    await updateCredits();
  }

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({ variantId:variantId, userId:userId,type:mode}),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {
    fetchClientSecret,
    onComplete: handlePaymentSuccess
  };

  async function updateCredits() {
    const credits = await findUserCreditsByClerkId();
    console.log('credits',credits);
    if (credits && auth) {
      const newAuth = {
        userId: auth.userId,
        userEmail: auth.userEmail,
        creditBalance: credits,
        isAdmin: auth.isAdmin,
        hasMember: auth.hasMember
      };
      console.log('newAuth',newAuth);
      setAuth(newAuth);
    }

  }


  return (

      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout className='w-full h-full md:min-w-[992px]'/>
      </EmbeddedCheckoutProvider>

  )
}