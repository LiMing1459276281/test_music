
import { addUserCredit,IUserCredit,updateUserCreditByClerkId } from "@/actions/credits";
import {findUserCreditsByClerkId} from "@/actions/user";
import { getProductInfoFromInvoice, getProductInfoFromPrice } from "@/lib/stripe-client";

const paddle_variantids_map = new Map<string,number>([
    ['price_1RIkYhE2WvTscvLq7nunLLVM',70],
    ['price_1RIkZ4E2WvTscvLqslXa7NBX',150],
    ['price_1RIkZNE2WvTscvLq6EIHrX7v',400],
    ['price_1RIkZVE2WvTscvLqBEmdX4VO',650],
    ['price_1RIkbWE2WvTscvLqqL86O8ZK',90],
    ['price_1RIkbpE2WvTscvLqcdg1hi7v',200],
    ['price_1RIkc7E2WvTscvLqjTtKiQi0',750],
    ['price_1RIkcLE2WvTscvLq5sUina0p',1500],
    ['price_1RIkdpE2WvTscvLqxcZH2Iml',600],
    ['price_1RIkeEE2WvTscvLqSgpgIJ3n',1250],
    ['price_1RIkeVE2WvTscvLqxmNlS3nA',3000],
    ['price_1RIkejE2WvTscvLqARcwsfPz',10000]
]);


export async function createOrderDetailsFromStripe (orderDetails: IOrderDetail) {

    const product = await getProductInfo(orderDetails);

    if(!product){
        return;
    }
    let creditAmount = Number(paddle_variantids_map.get(product.priceId as string));
    if(!creditAmount){
        return;
    }
    
    let credit_desc = 'one time: '+product.priceName+', '+product.priceId;
    let credit_type = '2';
    if(orderDetails.invoice){
        credit_desc = 'subscription: '+product.priceName+', '+product.priceId;
        credit_type = '1';
    }
    const user_id = orderDetails.userId??product.userId; // login user id
    const credit:IUserCredit ={
        clerk_id: user_id,
        order_number: orderDetails.transactionId,
        credit_amount: creditAmount,
        credit_type: credit_type,
        credit_transaction_type: '1',
        credit_desc: credit_desc
    }
    await addUserCredit(credit);
    await updateUserCreditByClerkId(-creditAmount,user_id);   
}

export async function refundedOrderDetailsFromStripe (orderDetails: IOrderDetail) {


    const product = await getProductInfo(orderDetails);
    
    if(!product){
        return;
    }

    const variant_id = product.priceId; // paddle price id

    let creditAmount = Number(paddle_variantids_map.get(variant_id));
    if(!creditAmount){
        return;
    }

    const variant_name = product.priceName; // paddle price name

    const user_id = orderDetails.userId??product.userId; // login user id
    
    const credit:IUserCredit ={
        clerk_id: user_id,
        order_number: orderDetails.transactionId,
        credit_amount: creditAmount,
        credit_type: '3',
        credit_transaction_type: '3',
        credit_desc: 'refund: '+variant_name+', '+variant_id
    }
    const currentCredit = await findUserCreditsByClerkId(user_id);
    await addUserCredit(credit);
    await updateUserCreditByClerkId(creditAmount,user_id,currentCredit);
}

async function getProductInfo(orderDetails: IOrderDetail){
    if(orderDetails.invoice && !orderDetails.priceId){
       return await getProductInfoFromInvoice(orderDetails.invoice);;
    }

    if(!orderDetails.invoice && orderDetails.priceId){
        return await getProductInfoFromPrice(orderDetails.priceId);;
    }

}


export interface IOrderDetail {
    userId: string;
    transactionId: string;
    invoice: string;
    priceId: string;
}