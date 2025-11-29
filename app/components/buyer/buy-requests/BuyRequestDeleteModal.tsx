"use client";

import React from "react";
import LoadingDots from "../../shared/LoadingDots";

interface BuyRequestDeleteModalProps {
    isOpen: boolean;
    step: "consent" | "loading" | "success";
    onClose: () => void;
    onConfirmDelete: () => void;
    onViewRequests: () => void;
}

export default function BuyRequestDeleteModal({
    isOpen,
    step,
    onClose,
    onConfirmDelete,
    onViewRequests,
}: BuyRequestDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={step === "consent" ? onClose : undefined}></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100 text-center">

                {step === "consent" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">Delete Request?</h3>
                            <p className="text-gray-500">
                                Are you sure you want to delete this buy request? This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

                {step === "loading" && (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <LoadingDots text="Deleting Request..." />
                    </div>
                )}

                {step === "success" && (
                    <div className="space-y-6 py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">Request Deleted</h3>
                            <p className="text-gray-500">
                                Your buy request has been successfully deleted.
                            </p>
                        </div>

                        <button
                            onClick={onViewRequests}
                            className="w-full px-6 py-3 bg-[#144E42] text-white font-bold rounded-lg hover:bg-[#0f3b32] transition-colors shadow-lg"
                        >
                            View Other Buy Requests
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
