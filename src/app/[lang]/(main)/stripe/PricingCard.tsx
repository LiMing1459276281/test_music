'use client'

import { useState } from 'react'
import Button from './button'

export default function PricingCard({ price, lang, index }: { price: any, lang: string, index: number }) {
    const [selectedVariant, setSelectedVariant] = useState(0);

    return (
        <div className="flex flex-col w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-8">
            <h5 className="mb-4 text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600 animate-gradient">
                {price.name}
            </h5>

            {/* 总价格区域 */}
            <div className="flex items-baseline bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600 animate-gradient mb-4">
                {/* <span className="text-3xl font-semibold animate-gradient">{price.unit}</span> */}
                <span className="text-5xl font-extrabold tracking-tight animate-gradient">
                    ${price.variants[selectedVariant].totalPrice}
                </span>
                <span className="ms-1 text-2xl font-normal text-gray-400">
                    / {price.variants[selectedVariant].creditsAmount}
                </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">{price.remark}</p>
            
            <div className="space-y-2 mb-6">
                {price.variants.map((variant:any, vIndex:any) => (
                    <div key={vIndex} 
                         onClick={() => setSelectedVariant(vIndex)}
                         className={`p-3 rounded-lg border cursor-pointer transition-all
                            ${selectedVariant === vIndex 
                              ? 'border-blue-500 bg-blue-900/20' 
                              : 'border-gray-700 hover:border-blue-400'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">US${variant.creditsAmount}</p>
                                <p className="text-sm text-gray-400">{variant.unitPrice}</p>
                            </div>
                            <span className="text-2xl font-bold text-white">
                                US$ {variant.totalPrice} 
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-auto">
                <Button 
                    btnlabel={price.buy_lable}
                    variantId={price.variants[selectedVariant].variantId}
                    lang={lang}
                    mode={price.type}
                />
            </div>

            <div className="flex flex-initial h-full">
                <ul role="list" className="space-y-5 my-7">
                    {price.description.map((desc:any, dIndex:any) => (
                        <li key={dIndex} className="flex items-center">
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-400 ms-3">{desc}</span>
                        </li>
                    ))}
                </ul>
            </div>

     
        </div>
    )
}