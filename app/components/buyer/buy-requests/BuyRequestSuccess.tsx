"use client";

import React from "react";

interface BuyRequestSuccessProps {
    onViewRequests: () => void;
    onCreateNew: () => void;
}

export default function BuyRequestSuccess({
    onViewRequests,
    onCreateNew,
}: BuyRequestSuccessProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-600">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-black font-parkinsans mb-2">
                Buy Request Successfully Created!
            </h3>
            <p className="text-gray-500 mb-8 max-w-md">
                Your request has been posted to the marketplace. Sellers will be notified and can start making offers.
            </p>
            <div className="w-full max-w-xs space-y-3">
                <button
                    onClick={onViewRequests}
                    className="w-full py-3 bg-[#144E42] text-white font-bold rounded-lg font-parkinsans hover:bg-[#0f3b32] transition-colors"
                >
                    View My Requests
                </button>
                <button
                    onClick={onCreateNew}
                    className="w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-lg font-parkinsans hover:bg-gray-50 transition-colors"
                >
                    Create Another Request
                </button>
            </div>
        </div>
    );
}
