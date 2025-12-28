"use client";

import React, { useState } from "react";
import MarketplaceHeader from "./MarketplaceHeader";
import SearchFilterBar from "./SearchFilterBar";
import BuyerRequestCard from "./BuyerRequestCard";
import SubmitOfferModal from "./SubmitOfferModal";

interface BuyerRequest {
    id: string;
    location: string;
    productName: string;
    quantityNeeded: string;
    pricePerKg: string;
    image: string;
}

export default function MarketplaceView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(null);

    // Sample buyer requests data
    const buyerRequests: BuyerRequest[] = [
        {
            id: "1",
            location: "Akolea Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "100kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "2",
            location: "Ikeja Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "150kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "3",
            location: "VI Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "200kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "4",
            location: "Lekki Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "80kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "5",
            location: "Surulere Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "120kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "6",
            location: "Yaba Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "90kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
    ];

    const handleMakeOffer = (request: BuyerRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                <MarketplaceHeader />
                <SearchFilterBar />

                {/* Buyer Requests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {buyerRequests.map((request) => (
                        <BuyerRequestCard
                            key={request.id}
                            request={request}
                            onMakeOffer={handleMakeOffer}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[#144E42] text-white font-parkinsans font-semibold">1</button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-parkinsans">2</button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-parkinsans">3</button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-parkinsans">4</button>
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Submit Offer Modal */}
            <SubmitOfferModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                request={selectedRequest}
            />
        </div>
    );
}
