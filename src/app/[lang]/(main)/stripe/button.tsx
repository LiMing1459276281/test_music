"use client"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getPathname } from "@/i18n-config";
import AuthContext from "@/components/customUI/auth-context";
import { useContext, useRef, useState } from 'react';
import Modal, { ModalRef } from "@/components/customUI/popup-modal";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import { findUserCreditsByClerkId } from "@/actions/user";

interface Props {
    btnlabel: string;
    variantId: string;
    lang: string;
    mode: string;
}
export default function Button({ btnlabel, variantId, lang, mode }: Props) {
    const modalRef = useRef<ModalRef | null>(null);
    const { auth, setAuth } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    async function onClickHandler() {
        if (!auth) {
            router.push(`${getPathname(lang, '/sign-in')}`);
            return;
        }

        setIsOpen(true);
    }

    async function getSessionUrl() {
        try {
            const response = await fetch(`/api/stripe`, {
                method: 'POST',
                body: JSON.stringify({ variantId: variantId, userId: auth?.userId, type: mode }),
            });
            const { sessionUrl } = await response.json();
            return sessionUrl;
        } catch (error) {
            console.error('payment error:', error);
        }
        return null;
    }

    return (
        <>

            {isOpen && (<div id="popup-modal" tabIndex={-1} className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0  max-h-full bg-gray-900/50`}>

                <div className="relative bg-white rounded-lg shadow w-full h-full md:max-w-[1024px] md:max-h-[748px]">
                    <button type="button" onClick={async () => {
                        setIsOpen(false);
                        // 无论支付是否成功，关闭时都刷新积分
                        if (auth) {
                            try {
                                const credits = await findUserCreditsByClerkId();
                                if (credits !== undefined) {
                                    const newAuth = {
                                        userId: auth.userId,
                                        userEmail: auth.userEmail,
                                        creditBalance: credits,
                                        isAdmin: auth.isAdmin,
                                        hasMember: auth.hasMember
                                    };
                                    setAuth(newAuth);
                                }
                            } catch (error) {
                                console.error('Error refreshing credits:', error);
                            }
                        }
                    }} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="text-center mt-10 mb-10">
                    
                        <CheckoutForm variantId={variantId} mode={mode} userId={auth?.userId!} />

                    </div>
                </div>

            </div>
            )}
            <button type="button" onClick={onClickHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">{btnlabel}</button>
        </>
    )
}