import React from "react";

export default function EmptyInterestedSellers() {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-[#144E42]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                </svg>
            </div>
            <div className="bg-[#144E42] text-white text-xs font-bold px-2 py-1 rounded mb-2">
                150 x 150
            </div>
            <h3 className="text-lg font-bold text-black mb-1 font-parkinsans">
                Zero Interested Sellers
            </h3>
            <p className="text-sm text-gray-500">
                interested seller's would appear here
            </p>
        </div>
    );
}
