"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWallet } from "../../../context/WalletContext";
import FundWalletModal from "./FundWalletModal";
import WalletDetailsModal from "./WalletDetailsModal";

export default function WalletDashboard() {
    const { walletData } = useWallet();
    const [isFundModalOpen, setIsFundModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    if (!walletData) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(amount);
    };

    return (
        <div className="w-full min-h-screen bg-[#F5F5F5]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#144E42] font-parkinsans mb-2">
                        My Wallet
                    </h1>
                    <p className="text-gray-600 font-parkinsans">
                        Manage your funds and view transaction history
                    </p>
                </div>

                <div className="flex gap-6 w-full items-center">
                    {/* Balance Card */}
                    <div className="flex w-full justify-between bg-[#144E42] rounded-2xl p-6 sm:p-8 text-white shadow-lg items-center relative overflow-hidden lg:flex-row flex-col">
                        {/* Background Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <div className="flex flex-row items-center gap-4">
                                <Image
                                    src="/images/logo.png"
                                    alt="Arecyl"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                                <span className="text-5xl font-bold font-parkinsans text-white">Arecyl</span>
                            </div>
                        </div>

                        <div className="flex w-full md:w-auto justify-between items-start relative z-10">
                            <div className="text-start w-full">
                                <p className="text-sm opacity-90 mb-2 font-parkinsans">Total Balance</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-parkinsans">
                                    {formatCurrency(walletData.balance)}
                                </h2>
                            </div>
                        </div>

                        <div className="flex gap-3 sm:gap-4 relative z-10 w-full mt-2 lg:mt-0 md:justify-end">
                            <button
                                onClick={() => setIsDetailsModalOpen(true)}
                                className="border-2 border-[#B8EE7D] backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-parkinsans font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base text-[#B8EE7D]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 hidden md:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                </svg>
                                View Details
                            </button>
                            <button
                                onClick={() => setIsFundModalOpen(true)}
                                className="bg-[#B8EE7D] text-[#144E26] backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-parkinsans font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                Fund Wallet
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 hidden md:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#144E42] font-parkinsans">
                            Recent Transactions
                        </h3>
                        <button className="text-sm text-[#144E42] font-semibold font-parkinsans hover:underline">
                            View All
                        </button>
                    </div>

                    {walletData.transactions.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 font-semibold font-parkinsans text-lg mb-1">No transactions yet</p>
                            <p className="text-sm text-gray-400 font-parkinsans">Your transaction history will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {walletData.transactions.slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === "credit" ? "bg-green-50" : "bg-red-50"
                                            }`}>
                                            {transaction.type === "credit" ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#282828] font-parkinsans">{transaction.description}</p>
                                            <p className="text-sm text-gray-500 font-parkinsans">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold font-parkinsans text-lg ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                                            }`}>
                                            {transaction.type === "credit" ? "+" : "-"}{formatCurrency(transaction.amount)}
                                        </p>
                                        <p className="text-xs text-gray-500 capitalize font-parkinsans">{transaction.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Fund Wallet Modal */}
                <FundWalletModal
                    isOpen={isFundModalOpen}
                    onClose={() => setIsFundModalOpen(false)}
                />

                {/* Wallet Details Modal */}
                <WalletDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            </div>
        </div>
    );
}
