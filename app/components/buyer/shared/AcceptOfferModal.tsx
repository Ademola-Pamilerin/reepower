import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ErrorMessage from "../../shared/ErrorMessage";
import PinInput from "../../shared/PinInput";
import LoadingDots from "../../shared/LoadingDots";
import { Seller } from "../buy-requests/InterestedSellersList";

interface AcceptOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    seller: Seller | null;
}

export default function AcceptOfferModal({
    isOpen,
    onClose,
    seller,
}: AcceptOfferModalProps) {
    const router = useRouter();
    const [step, setStep] = useState<"confirm" | "payment-details" | "pin" | "loading" | "success">("confirm");
    const [pin, setPin] = useState("");

    if (!isOpen || !seller) return null;

    const handleConfirm = () => {
        setStep("payment-details");
    };

    const handleProceedToPin = () => {
        setStep("pin");
    };

    const handlePinComplete = (value: string) => {
        setPin(value);
    };

    const handlePay = () => {
        setStep("loading");

        // Simulate API call
        setTimeout(() => {
            setStep("success");
            setTimeout(() => {
                // onClose(); // Keep modal open to show success message and track order button
                // setStep("confirm");
                // setPin("");
            }, 2000);
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        setStep("confirm");
        setPin("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 transform transition-all scale-100">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {step === "confirm" && (
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-black font-parkinsans mb-4">
                            Are you sure you want to accept this seller's offer?
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-left flex gap-4">
                            <div className="relative w-36 h-40 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                                <Image
                                    src={seller.image}
                                    alt={seller.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between h-40">
                                <div className="flex items-center gap-1 text-xs text-[#144E42] font-medium">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {seller.location}
                                </div>
                                <div>
                                    <h3 className="font-bold text-black text-lg">{seller.name}</h3>
                                    <p className="text-sm text-gray-500">Verified PET bottle recycler</p>
                                </div>
                            </div>
                            <div className="ml-auto text-right flex flex-col justify-between h-40">
                                <p className="font-bold text-[#144E42] text-lg">{seller.price}</p>
                                <p className="text-xs text-gray-500">5000KG Available</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleConfirm}
                                className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                            >
                                Confirm I'm Accepting this Offer
                            </button>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-lg font-parkinsans hover:bg-gray-50 transition-colors"
                            >
                                Manage Offer
                            </button>
                        </div>
                    </div>
                )}

                {step === "payment-details" && (
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-black font-parkinsans mb-6">
                            Pay from Wallet
                        </h3>

                        <div className="bg-[#E8F5E9] p-6 rounded-xl mb-6">
                            <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
                            <p className="text-2xl font-bold text-[#144E42]">₦4,534,200.99</p>
                        </div>

                        <div className="flex justify-between items-center mb-6 text-sm">
                            <span className="text-gray-600">Total Order Amount</span>
                            <span className="font-bold text-black">{seller.price}</span>
                        </div>

                        <button
                            onClick={handleProceedToPin}
                            className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                        >
                            Pay Now
                        </button>
                    </div>
                )}

                {step === "pin" && (
                    <div className="text-center py-4">
                        <h3 className="text-lg font-bold text-black font-parkinsans mb-2">
                            Enter Transaction PIN
                        </h3>
                        <p className="text-sm text-gray-500 mb-8">
                            Enter your 4-digit PIN to authorize this payment of <span className="font-bold text-black">{seller.price}</span>
                        </p>

                        <div className="mb-8">
                            <PinInput
                                length={4}
                                value={pin}
                                onChange={setPin}
                                onComplete={handlePinComplete}
                            />
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={pin.length !== 4}
                            className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Payment
                        </button>
                    </div>
                )}

                {step === "loading" && (
                    <div className="py-12">
                        <LoadingDots text="Confirming PIN..." />
                    </div>
                )}

                {step === "success" && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-black font-parkinsans mb-2">
                            Payment Successful!
                        </h3>
                        <p className="text-gray-500 mb-6">
                            You have successfully accepted the offer from {seller.name}
                        </p>
                        <button
                            onClick={() => router.push(`/buyers/orders/track-order/${seller.id}`)}
                            className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                        >
                            Track Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
