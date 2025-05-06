export interface Pricing {
    title: string;
    subtitle: string;
    pricing_description: string;
    ko_fi_tips1: string;
    payment_tips1: string;
    ko_fi_tips2: string;
    news: string;
    prices: {
      type: string;
      variantId: string;
      name: string;
      price: number;
      unit: string;
      duration: string;
      defaultVariant: number;
      variants: {
        creditsAmount:string;
        unitPrice:string;
        totalPrice:number;
        variantId:string;
    }[];
      remark: string;
      buy_lable: string;
      description: string[];
    }[];
    meta:{
        title: string;
        description: string;
    }
}