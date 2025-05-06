import 'server-only'
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{stripeAccount: process.env.STRIPE_ACCOUNT_ID});
export async function getProductInfoFromInvoice(invoiceId: string):Promise<IProduct | undefined> {

  const invoice = await stripe.invoices.retrieve(invoiceId, {
    expand: ['lines.data.price.product'],
  });
  const lineItem = invoice.lines.data[0];
  if (!lineItem || !lineItem.price || typeof lineItem.price === 'string' || !lineItem.price.product) {
    console.log('No product found in invoice.');
    return undefined
  }
  const product = lineItem.price.product;
  let productInfo;
  if (typeof product === 'string') {
    productInfo = await stripe.products.retrieve(product);
  }
  productInfo = product as Stripe.Product;
  if(productInfo){
    return { 
      priceId: productInfo.default_price as string, 
      priceName: productInfo.name,
      userId: invoice.subscription_details?.metadata?.userId
    };
  }
  console.log('No product found in invoice.');
}

export async function getProductInfoFromPrice(priceId: string):Promise<IProduct | undefined> {
  const price = await stripe.prices.retrieve(priceId,{
    expand: ['product']
  });

  if(price.product && typeof price.product !== 'string'){
    const product = price.product as Stripe.Product;
    return {
      priceId: price.id,
      priceName: product.name,
    };
  }
}

export interface IProduct{
  priceId:string;
  priceName:string;
  userId?:string;
}