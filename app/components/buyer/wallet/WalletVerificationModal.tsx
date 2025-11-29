"use client";

import React, { useState, useRef } from "react";

interface WalletVerificationModalProps {
    isOpen: boolean;
    step: "email-sent" | "phone-verify" | "enter-pin" | "confirm-pin" | "success";
    onClose: () => void;
    onVerifyPhone: (code: string) => void;
    onPhoneCodeVerified: (code: string) => void;
    onEnterPin: (pin: string) => void;
    onConfirmPin: (pin: string) => void;
    onSuccess: () => void;
    phoneNumber?: string;
}

export default function WalletVerificationModal({
    isOpen,
    step,
    onClose,
    onVerifyPhone,
    onPhoneCodeVerified,
    onEnterPin,
    onConfirmPin,
    onSuccess,
    phoneNumber = "",
}: WalletVerificationModalProps) {
    const [phoneCode, setPhoneCode] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPinValue, setConfirmPinValue] = useState("");

    const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const confirmPinInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    if (!isOpen) return null;

    const handlePhoneVerifySubmit = () => {
        if (phoneCode.length === 6) {
            onPhoneCodeVerified(phoneCode);
        }
    };

    const handleEnterPinSubmit = () => {
        if (pin.length === 4) {
            onEnterPin(pin);
        }
    };

    const handleConfirmPinSubmit = () => {
        if (confirmPinValue.length === 4) {
            onConfirmPin(confirmPinValue);
        }
    };

    const handleDigitInput = (
        value: string,
        index: number,
        code: string,
        setCode: (code: string) => void,
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
        maxLength: number
    ) => {
        if (value && /^\d$/.test(value)) {
            const newCode = code.split("");
            newCode[index] = value;
            setCode(newCode.join(""));
            if (index < maxLength - 1) {
                refs.current[index + 1]?.focus();
            }
        } else if (!value) {
            const newCode = code.split("");
            newCode[index] = "";
            setCode(newCode.join(""));
        }
    };

    const handleBackspace = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };

    const renderDigitInputs = (
        count: number,
        code: string,
        setCode: (code: string) => void,
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
        return (
            <div className="flex gap-2 md:gap-3 justify-center">
                {[...Array(count)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            refs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={code[index] || ""}
                        onChange={(e) =>
                            handleDigitInput(e.target.value, index, code, setCode, refs, count)
                        }
                        onKeyDown={(e) => handleBackspace(e, index, refs)}
                        className="w-12 h-12 text-center text-black text-xl font-bold rounded-lg border-2 border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all"
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all scale-100 text-center">
                {step === "email-sent" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-green-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Code Sent to Email
                            </h3>
                            <p className="text-gray-500">
                                We've sent a verification code to your email address. Please check your
                                inbox.
                            </p>
                        </div>

                        <button
                            onClick={() => onVerifyPhone("")}
                            className="w-full px-6 py-3 bg-[#144E42] text-white font-semibold rounded-lg hover:bg-[#0f3b32] transition-colors shadow-lg"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === "phone-verify" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Confirm Verification Code
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Kindly input below the 6-digit OTP we just sent to your phone number
                                ending with {phoneNumber.slice(-4)}
                            </p>

                            {renderDigitInputs(6, phoneCode, setPhoneCode, phoneInputRefs)}
                        </div>

                        <button
                            onClick={handlePhoneVerifySubmit}
                            disabled={phoneCode.length !== 6}
                            className={` bg-[#144E42] w-full px-6 py-3 font-semibold rounded-lg transition-colors shadow-lg ${phoneCode.length === 6
                                    ? " text-white hover:bg-[#0f3b32]"
                                    : "opacity-40 cursor-not-allowed"
                                }`}
                        >
                            Verify Code
                        </button>
                    </div>
                )}

                {step === "enter-pin" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-purple-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Create Your PIN
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Set up a 4-digit PIN to secure your wallet
                            </p>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                                    Enter PIN
                                </label>
                                {renderDigitInputs(4, pin, setPin, pinInputRefs)}
                            </div>
                        </div>

                        <button
                            onClick={handleEnterPinSubmit}
                            disabled={pin.length !== 4}
                            className={`bg-[#144E42] w-full px-6 py-3 font-semibold rounded-lg transition-colors shadow-lg ${pin.length === 4
                                    ? " text-white hover:bg-[#0f3b32]"
                                    : "opacity-50 cursor-not-allowed"
                                }`}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === "confirm-pin" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-purple-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Confirm Your PIN
                            </h3>
                            <p className="text-gray-500 mb-6">Re-enter your 4-digit PIN to confirm</p>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                                    Confirm PIN
                                </label>
                                {renderDigitInputs(
                                    4,
                                    confirmPinValue,
                                    setConfirmPinValue,
                                    confirmPinInputRefs
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmPinSubmit}
                            disabled={confirmPinValue.length !== 4}
                            className={`w-full px-6 py-3 font-bold rounded-lg transition-colors shadow-lg ${confirmPinValue.length === 4
                                    ? "bg-[#144E42] text-white hover:bg-[#0f3b32]"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Create Wallet
                        </button>
                    </div>
                )}

                {step === "success" && (
                    <div className="space-y-6 py-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-12 h-12 text-green-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Wallet Successfully Created!
                            </h3>
                            <p className="text-gray-500">
                                You're all set! Your wallet is all set up and ready to use for
                                transactions
                            </p>
                        </div>

                        <button
                            onClick={onSuccess}
                            className="w-full px-6 py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg hover:bg-[#a3d96b] transition-colors shadow-lg font-parkinsans"
                        >
                            Proceed to wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
