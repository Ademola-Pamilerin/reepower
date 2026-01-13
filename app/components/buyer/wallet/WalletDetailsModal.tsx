"use client";

import React, { useState } from "react";
import { useWallet } from "../../../context/WalletContext";
import { AnimatePresence, motion } from "framer-motion";

interface WalletDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WalletDetailsModal({ isOpen, onClose }: WalletDetailsModalProps) {
    const { walletData } = useWallet();
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    // Fallback data if walletData fields are missing (for development/demo)
    const accountName = walletData?.accountName || "John Doe";
    const accountNumber = walletData?.accountNumber || "1234567890";
    const bankName = walletData?.bankName || "Arecyl Bank";

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-[#144E42] p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold font-parkinsans">Wallet Details</h2>
                                    <p className="text-white/80 text-sm font-parkinsans mt-1">Use these details to fund your wallet</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                {/* Bank Name */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-500 font-parkinsans mb-1">Bank Name</p>
                                    <p className="text-lg font-bold text-[#144E42] font-parkinsans">{bankName}</p>
                                </div>

                                {/* Account Number */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center group">
                                    <div>
                                        <p className="text-sm text-gray-500 font-parkinsans mb-1">Account Number</p>
                                        <p className="text-2xl font-bold text-[#144E42] font-parkinsans tracking-wider">{accountNumber}</p>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 hover:bg-white rounded-lg transition-colors relative"
                                        title="Copy Account Number"
                                    >
                                        {copied ? (
                                            <span className="text-green-600 flex items-center gap-1 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                                                Copied!
                                            </span>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 group-hover:text-[#144E42]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Account Name */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-500 font-parkinsans mb-1">Account Name</p>
                                    <p className="text-lg font-bold text-[#144E42] font-parkinsans">{accountName}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <p className="text-sm text-blue-800 font-parkinsans">
                                    Transfers to this account are automatically credited to your wallet instantly.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
