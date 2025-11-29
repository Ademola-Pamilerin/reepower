"use client";

import React, { useState } from "react";
import Image from "next/image";
import WalletVerificationModal from "./WalletVerificationModal";
import { useWallet } from "../../../context/WalletContext";

export default function WalletCreationForm() {
    const { createWallet } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState<
        "email-sent" | "phone-verify" | "enter-pin" | "confirm-pin" | "success"
    >("email-sent");
    const [enteredPin, setEnteredPin] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        bvn: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.email && formData.phoneNumber && formData.bvn;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Simulate sending email
        setIsModalOpen(true);
        setModalStep("email-sent");
    };

    const handleVerifyPhone = async (code: string) => {
        // Simulate phone verification
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setModalStep("phone-verify");
    };

    const handlePhoneCodeVerified = async (code: string) => {
        // Simulate code verification
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setModalStep("enter-pin");
    };

    const handleEnterPin = async (pin: string) => {
        // Store the entered PIN
        setEnteredPin(pin);
        setModalStep("confirm-pin");
    };

    const handleConfirmPin = async (confirmPin: string) => {
        // Check if PINs match
        if (confirmPin === enteredPin) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            createWallet({
                ...formData,
            });
            setModalStep("success");
        } else {
            alert("PINs do not match. Please try again.");
            setModalStep("enter-pin");
            setEnteredPin("");
        }
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        // The parent component will detect hasWallet and switch to dashboard
    };

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Image */}
                    <div className="hidden lg:block sticky top-8">
                        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/wallet.png"
                                alt="Create Wallet"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
                                <h2 className="text-4xl font-bold font-parkinsans mb-4">
                                    Create Your Wallet
                                </h2>
                                <p className="text-lg text-gray-200">
                                    Set up your secure wallet to manage transactions and payments
                                    seamlessly.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full">
                        <div className="mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-black font-parkinsans mb-2">
                                Wallet Setup
                            </h1>
                            <p className="text-gray-600">
                                Enter your registered email or phone number. We'll send you a code to
                                reset your password.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm"
                        >
                            <div className="space-y-6">
                                {/* Email Address */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-black font-normal"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-black font-normal"
                                        required
                                    />
                                </div>

                                {/* BVN */}
                                <div>
                                    <label
                                        htmlFor="bvn"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        BVN
                                    </label>
                                    <input
                                        type="text"
                                        id="bvn"
                                        name="bvn"
                                        value={formData.bvn}
                                        onChange={handleChange}
                                        placeholder="Enter your bvn"
                                        maxLength={11}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-black font-normal"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid}
                                        className={`w-full px-6 py-4 rounded-lg font-parkinsans font-bold text-lg transition-colors shadow-lg hover:shadow-xl ${isFormValid
                                            ? "bg-[#144E42] text-white hover:bg-[#0f3b32]"
                                            : "bg-[#B9F17A] text-[#144E42] cursor-not-allowed opacity-50"
                                            }`}
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Verification Modal */}
            <WalletVerificationModal
                isOpen={isModalOpen}
                step={modalStep}
                onClose={() => setIsModalOpen(false)}
                onVerifyPhone={handleVerifyPhone}
                onPhoneCodeVerified={handlePhoneCodeVerified}
                onEnterPin={handleEnterPin}
                onConfirmPin={handleConfirmPin}
                onSuccess={handleSuccess}
                phoneNumber={formData.phoneNumber}
            />
        </div>
    );
}
