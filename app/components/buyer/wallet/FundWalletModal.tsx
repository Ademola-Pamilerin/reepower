import React, { useState, useEffect } from "react";
import LoadingDots from "../../shared/LoadingDots";

interface FundWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = "amount" | "method" | "details" | "processing" | "success";
type PaymentMethod = "card" | "bank" | null;

export default function FundWalletModal({ isOpen, onClose }: FundWalletModalProps) {
    const [step, setStep] = useState<Step>("amount");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
    const [isCopied, setIsCopied] = useState(false);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStep("amount");
            setAmount("");
            setPaymentMethod(null);
            setIsCopied(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const formatAmount = (value: string) => {
        // Remove non-digits
        const cleanValue = value.replace(/\D/g, "");
        // Add commas
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow digits and commas
        if (/^[\d,]*$/.test(value)) {
            setAmount(formatAmount(value));
        }
    };

    const handleAmountSubmit = () => {
        if (amount) setStep("method");
    };

    const handleMethodSelect = (method: "card" | "bank") => {
        setPaymentMethod(method);
        setStep("details");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("1234567890");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleBack = () => {
        if (step === "method") {
            setStep("amount");
        } else if (step === "details") {
            setStep("method");
            setPaymentMethod(null);
        }
    };

    const handleProcessPayment = () => {
        setStep("processing");
        // Simulate processing
        setTimeout(() => {
            setStep("success");
            // Close after success (optional, or let user close)
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Back Button */}
                {(step === "method" || step === "details") && (
                    <button
                        onClick={handleBack}
                        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content based on step */}
                <div className="mt-2">
                    {step === "amount" && (
                        <div className="space-y-6">
                            <div className="text-center flex justify-center items-center flex-col">
                                <h2 className="text-2xl font-bold text-[#144E42] font-parkinsans mb-2">Fund Wallet</h2>
                                <p className="text-gray-600 font-parkinsans w-10/12">Kindly input the amount you would like to fund your wallet with below.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-parkinsans">Amount</label>
                                <div className="relative my-5">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">NGN</span>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans text-lg text-black"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleAmountSubmit}
                                disabled={!amount}
                                className={`w-full py-4 rounded-xl font-bold font-parkinsans transition-all bg-[#B8EE7D] text-[#144E42] ${amount
                                    ? " cursor-pointer"
                                    : " cursor-not-allowed opacity-50"
                                    }`}
                            >
                                Proceed
                            </button>
                        </div>
                    )}

                    {step === "method" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#144E42] font-parkinsans mb-2">Select Payment Method</h2>
                                <p className="text-gray-600 font-parkinsans">Choose how you want to fund your wallet</p>
                            </div>

                            <div className="grid grid-cols-1 gap-7">
                                <button
                                    onClick={() => handleMethodSelect("card")}
                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#144E42] hover:bg-green-50 transition-all group text-left"
                                >
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#144E42] group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#144E42] font-parkinsans">Pay with Card</h3>
                                        <p className="text-sm text-gray-500 font-parkinsans">Fund using your debit or credit card</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleMethodSelect("bank")}
                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#144E42] hover:bg-green-50 transition-all group text-left"
                                >
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#144E42] group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#144E42] font-parkinsans">Bank Transfer</h3>
                                        <p className="text-sm text-gray-500 font-parkinsans">Fund via direct bank transfer</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "details" && paymentMethod === "card" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#144E42] font-parkinsans mb-2">Enter Card Details</h2>
                                <p className="text-gray-600 font-parkinsans">Securely enter your card information</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between bg-[#E7F5E8] p-4 rounded-xl text-[#424242] font-parkinsans">
                                    <h3 className="font-semibold">Amount</h3>
                                    <h3>NGN {amount}</h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-parkinsans">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 font-parkinsans">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 font-parkinsans">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleProcessPayment}
                                className="w-full py-4 rounded-xl bg-[#144E42] text-white font-bold font-parkinsans hover:bg-[#0e3a31] shadow-lg hover:shadow-xl transition-all"
                            >
                                Pay NGN {amount}
                            </button>
                        </div>
                    )}

                    {step === "details" && paymentMethod === "bank" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#144E42] font-parkinsans mb-2">Bank Transfer</h2>
                                <p className="text-gray-600 font-parkinsans">Transfer the exact amount to the account below</p>
                            </div>

                            <div className="flex justify-between bg-[#E7F5E8] p-4 rounded-xl text-[#424242] font-parkinsans">
                                <h3 className="font-semibold">Amount</h3>
                                <h3>NGN {amount}</h3>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-parkinsans">Bank Name</span>
                                    <span className="font-bold text-[#144E42] font-parkinsans">ReePower Bank</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-parkinsans">Account Number</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#144E42] font-parkinsans text-xl">1234567890</span>
                                        <button
                                            onClick={handleCopy}
                                            className="text-[#144E42] hover:text-[#0e3a31] relative group"
                                            title="Copy Account Number"
                                        >
                                            {isCopied ? (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                    <span className="text-xs font-bold">Copied!</span>
                                                </div>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-parkinsans">Account Name</span>
                                    <span className="font-bold text-[#144E42] font-parkinsans">ReePower Wallet Funding</span>
                                </div>
                            </div>

                            <button
                                onClick={handleProcessPayment}
                                className="w-full py-4 rounded-xl bg-[#144E42] text-white font-bold font-parkinsans hover:bg-[#0e3a31] shadow-lg hover:shadow-xl transition-all"
                            >
                                I Have Made the Transfer
                            </button>
                        </div>
                    )}

                    {step === "processing" && (
                        <div className="py-12 flex flex-col items-center justify-center">
                            <LoadingDots text="Processing Payment..." />
                        </div>
                    )}

                    {step === "success" && (
                        <div className="text-center py-8 space-y-6">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-[#144E42]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#144E42] font-parkinsans mb-2">Payment Successful!</h2>
                                <p className="text-gray-600 font-parkinsans">Your wallet has been funded with NGN {amount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
