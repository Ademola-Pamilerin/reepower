"use client";

import React from "react";
import LoadingDots from "../../shared/LoadingDots";
import BuyRequestSuccess from "./BuyRequestSuccess";

interface BuyRequestSubmissionModalProps {
    isOpen: boolean;
    step: "loading" | "success";
    onViewRequests: () => void;
    onCreateNew: () => void;
}

export default function BuyRequestSubmissionModal({
    isOpen,
    step,
    onViewRequests,
    onCreateNew,
}: BuyRequestSubmissionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 transform transition-all scale-100">
                {step === "loading" && (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <LoadingDots text="Submitting Buy Request..." />
                    </div>
                )}

                {step === "success" && (
                    <BuyRequestSuccess
                        onViewRequests={onViewRequests}
                        onCreateNew={onCreateNew}
                    />
                )}
            </div>
        </div>
    );
}
