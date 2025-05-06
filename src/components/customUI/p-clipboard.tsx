import React, { useState, useEffect, useRef } from 'react';

interface Props {
    className?: string;
    value: string;
    children?: React.ReactNode;
}
export default function Clipboard({ className, value, children }: Props) {

    const [copied, setCopied] = useState(false);
    
    async function handleCopy(){
        navigator.clipboard.writeText(value)
        .then(() => {
            setCopied(true);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => { setCopied(false) }, 1500); // Reset 'copied' state after 1.5 seconds
        }
    }, [copied]);
    return (
        <div className="flex flex-col w-full border px-2.5 py-2.5 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
            <p className={`h-full text-base text-gray-800 dark:text-gray-400 ${className}`}>
               {value}
            </p>
            <div className={`inline-flex mt-4 w-full ${children?'justify-between':'justify-end'}`}>
                {children}
                <button id="copy-text" onClick={handleCopy} type="button" className="text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                    {!copied ?<span id="default-message" className="inline-flex items-center">
                        <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                        <span className="text-xs font-semibold">Copy</span>
                    </span>:
                    <span id="success-message" className="inline-flex items-center">
                        <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                    </span>}
                </button>
            </div>
        </div>
    );
}