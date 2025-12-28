"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BuyerRequest {
    id: string;
    location: string;
    productName: string;
    quantityNeeded: string;
    pricePerKg: string;
    image: string;
}

interface SubmitOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: BuyerRequest | null;
}

type ModalStep = "form" | "confirm" | "loading" | "success";

export default function SubmitOfferModal({ isOpen, onClose, request }: SubmitOfferModalProps) {
    const [step, setStep] = useState<ModalStep>("form");
    const [formData, setFormData] = useState({
        availableQuantity: "",
        offerPrice: "",
        description: "",
        images: [] as File[],
    });

    if (!isOpen || !request) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("confirm");
    };

    const handleConfirm = () => {
        setStep("loading");

        // Simulate API call
        setTimeout(() => {
            setStep("success");
        }, 2000);
    };

    const handleEdit = () => {
        setStep("form");
    };

    const handleClose = () => {
        setStep("form");
        setFormData({ availableQuantity: "", offerPrice: "", description: "", images: [] });
        onClose();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormData({ ...formData, images: [...formData.images, ...filesArray] });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-xl w-full px-12 py-8 relative max-h-[90vh] overflow-y-auto ">
                {/* Close Button */}
                {step !== "loading" && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Form Step */}
                {step === "form" && (
                    <>
                        <h2 className="text-xl font-bold text-black font-parkinsans mb-6 text-center">
                            Submit Offer
                        </h2>

                        {/* Product Image */}
                        <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <Image
                                src={request.image}
                                alt={request.productName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-base font-bold text-black font-parkinsans">
                                        {request.productName}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-parkinsans">
                                        {request.quantityNeeded}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                            <circle cx="12" cy="9" r="2.5" fill="white" />
                                        </svg>
                                        <span className="font-parkinsans">{request.location}</span>
                                    </div>
                                    <p className="text-base font-bold text-black font-parkinsans">
                                        {request.pricePerKg}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 mb-5">
                            {/* Available Quantity */}
                            <div>
                                <label className="block text-sm font-semibold text-black font-parkinsans mb-2">
                                    Available Quantity
                                </label>
                                <input
                                    type="text"
                                    placeholder="500kg"
                                    value={formData.availableQuantity}
                                    onChange={(e) => setFormData({ ...formData, availableQuantity: e.target.value })}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#144E42] font-parkinsans text-sm placeholder:text-black/30 text-black/70"
                                />
                            </div>

                            {/* Upload Offer Button */}
                            <button
                                type="submit"
                                disabled={!formData.availableQuantity}
                                className="w-full px-6 py-3 bg-[#B8EE7D] disabled:opacity-30 text-[#164E43] rounded-lg font-parkinsans font-semibold hover:bg-[#a8de6d] transition-colors"
                            >
                                Upload Offer
                            </button>
                        </form>
                    </>
                )}

                {/* Confirm Step */}
                {step === "confirm" && (
                    <>
                        <h2 className="text-xl font-bold text-black font-parkinsans mb-6 text-center">
                            Confirm Offer
                        </h2>

                        {/* Product Header */}
                        <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
                            <div>
                                <h3 className="text-base font-bold text-black font-parkinsans">
                                    {request.productName}
                                </h3>
                                <p className="text-sm text-gray-600 font-parkinsans">
                                    {request.quantityNeeded}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                        <circle cx="12" cy="9" r="2.5" fill="white" />
                                    </svg>
                                    <span className="font-parkinsans">{request.location}</span>
                                </div>
                                <p className="text-base font-bold text-black font-parkinsans">
                                    {request.pricePerKg}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 font-parkinsans">Available Quantity</span>
                                <span className="text-sm font-semibold text-black font-parkinsans">{formData.availableQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 font-parkinsans">Preferred Offere price per kg</span>
                                <span className="text-sm font-semibold text-black font-parkinsans">NGN 1,000/kg</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 font-parkinsans">Description:</span>
                                <span className="text-sm text-black font-parkinsans">Package must be packe...</span>
                            </div>

                            {/* Uploaded Images */}
                            <div>
                                <p className="text-sm text-gray-600 font-parkinsans mb-2">Uploaded Images</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-1">IMG {i}.JPG</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleConfirm}
                                className="w-full px-6 py-3 bg-[#B8EE7D] text-black rounded-lg font-parkinsans font-semibold hover:bg-[#a8de6d] transition-colors"
                            >
                                Confirm Offer
                            </button>
                            <button
                                onClick={handleEdit}
                                className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-parkinsans font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    </>
                )}

                {/* Loading Step */}
                {step === "loading" && (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce" style={{ animationDelay: "450ms" }}></div>
                        </div>
                        <p className="text-gray-600 font-parkinsans">Submitting your offer...</p>
                    </div>
                )}

                {/* Success Step */}
                {step === "success" && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-black font-parkinsans mb-2">
                            Offer Submitted Successfully
                        </h3>
                        <p className="text-gray-600 font-parkinsans text-center mb-6">
                            Your offer has been sent to the buyer
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-3 bg-[#144E42] text-white rounded-lg font-parkinsans font-semibold hover:bg-[#1a6350] transition-colors"
                        >
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
