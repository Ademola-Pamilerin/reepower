import React from "react";
import Image from "next/image";

interface BuyerRequest {
    id: string;
    location: string;
    productName: string;
    quantityNeeded: string;
    pricePerKg: string;
    image: string;
}

interface BuyerRequestCardProps {
    request: BuyerRequest;
    onMakeOffer: (request: BuyerRequest) => void;
}

export default function BuyerRequestCard({ request, onMakeOffer }: BuyerRequestCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-40 bg-gray-100">
                <Image
                    src={request.image}
                    alt={request.productName}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                    <span className="font-parkinsans">{request.location}</span>
                </div>

                {/* Product Name */}
                <h3 className="text-base font-bold text-black font-parkinsans mb-2">
                    {request.productName}
                </h3>

                {/* Quantity and Price on same line */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 font-parkinsans">
                        {request.quantityNeeded}
                    </span>
                    <span className="text-base font-bold text-[#144E42] font-parkinsans">
                        {request.pricePerKg}
                    </span>
                </div>

                {/* Full Width Button */}
                <button
                    onClick={() => onMakeOffer(request)}
                    className="w-full px-4 py-2.5 bg-[#144E42] text-white rounded-lg font-parkinsans font-semibold hover:bg-[#1a6350] transition-colors text-sm"
                >
                    Make an Offer
                </button>
            </div>
        </div>
    );
}
