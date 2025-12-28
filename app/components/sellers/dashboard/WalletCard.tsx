"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function WalletCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    return (
        <div className="bg-gradient-to-r from-[#144E42] to-[#1a6350] rounded-2xl p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-sm opacity-90 mb-1">Wallet Balance</p>
                    <div className="flex items-center gap-2">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold font-parkinsans">
                            {isBalanceVisible ? "NGN 100,000.00" : "*********"}
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                            className="hover:opacity-80 transition-opacity focus:outline-none cursor-pointer p-1"
                            aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
                        >
                            {isBalanceVisible ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 opacity-75"
                                >
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 opacity-75">
                                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        className="w-1/2 lg:w-auto flex items-center justify-center px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg font-parkinsans font-semibold hover:bg-white/30 transition-colors border border-white/30 whitespace-nowrap"
                    >
                        Wallet Details
                    </button>
                    <Link
                        href="/sellers/wallet"
                        className="w-1/2 lg:w-auto flex items-center justify-center px-5 py-2.5 bg-[#B8EE7D] text-[#144E42] rounded-lg font-parkinsans font-semibold hover:bg-[#a3d96b] transition-colors whitespace-nowrap"
                    >
                        Fund Wallet
                    </Link>
                </div>
            </div>
        </div>
    );
}
