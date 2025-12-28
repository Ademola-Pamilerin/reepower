import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BuyerRequest {
    id: string;
    location: string;
    productName: string;
    quantityNeeded: string;
    pricePerKg: string;
    image: string;
}

interface RecentBuyerRequestProps {
    requests: BuyerRequest[];
}

export default function RecentBuyerRequest({ requests }: RecentBuyerRequestProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Recent Buyer Request
                    </h2>
                    <Link
                        href="#"
                        className="text-sm text-[#144E42] font-semibold hover:underline"
                    >
                        See All
                    </Link>
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                        {requests.map((request) => (
                            <div key={request.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="flex flex-col lg:flex-row h-full">
                                    {/* Image - Top on mobile, Left on large screens */}
                                    <div className="relative w-full lg:w-40 h-48 lg:h-auto bg-gray-100 shrink-0">
                                        <Image
                                            src={request.image}
                                            alt={request.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content - Bottom on mobile, Right on large screens */}
                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                        {/* Location */}
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                                <circle cx="12" cy="9" r="2.5" fill="white" />
                                            </svg>
                                            <span className="font-parkinsans">{request.location}</span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-base font-bold text-black font-parkinsans mb-1">
                                            {request.productName}
                                        </h3>

                                        {/* Quantity */}
                                        <p className="text-sm text-gray-600 font-parkinsans mb-3">
                                            {request.quantityNeeded}
                                        </p>

                                        {/* Price and Action */}
                                        <div className="mt-auto">
                                            <span className="text-lg font-bold text-[#144E42] font-parkinsans block mb-2">
                                                {request.pricePerKg}
                                            </span>
                                            <button className="w-full px-4 py-2 bg-[#144E42] text-white rounded-lg font-parkinsans font-semibold hover:bg-[#1a6350] transition-colors text-sm">
                                                Make an Offer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
