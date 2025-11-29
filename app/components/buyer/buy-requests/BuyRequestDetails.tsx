"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmptyInterestedSellers from "./EmptyInterestedSellers";
import InterestedSellersList, { Seller } from "./InterestedSellersList";
import AcceptOfferModal from "../shared/AcceptOfferModal";
import SellerProfile from "../shared/SellerProfile";
import { useBuyRequests } from "../../../context/BuyRequestsContext";

export default function BuyRequestDetails({ id = "12345" }: { id?: string }) {
    const router = useRouter();
    const { getRequest } = useBuyRequests();
    const request = getRequest(id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [viewingProfileSeller, setViewingProfileSeller] = useState<Seller | null>(null);

    if (!request) {
        return <div className="p-8 text-center">Request not found</div>;
    }

    // Map context data to component structure
    const requestData = {
        id: request.id,
        materialType: request.materialType,
        quantity: `${request.quantity}kg`,
        location: request.location,
        priceRange: `₦${Number(request.priceMin).toLocaleString()} - ₦${Number(request.priceMax).toLocaleString()}`,
        preferredQuality: request.description, // Using description as preferred quality for now
        dateCreated: request.dateCreated,
        note: request.description,
        image: request.images[0] || "/images/pet-bottles.jpg"
    };

    const dummySellers: Seller[] = [
        {
            id: 1,
            name: "Global Recyclers Ltd",
            location: "Ogun State",
            description: "We have 200 tons available immediately.",
            price: "₦380,000",
            unitPrice: "per ton",
            image: "/images/seller-image.png",
            rating: 4.5
        },
        {
            id: 2,
            name: "Eco Plastics",
            location: "Lagos",
            description: "High quality clear film.",
            price: "₦390,000",
            unitPrice: "per ton",
            image: "/images/buyer-image.png",
            rating: 4.0
        }
    ];

    const offersCount = dummySellers.length;
    const hasOffers = offersCount > 0;

    const handleAcceptOffer = (seller: Seller) => {
        setSelectedSeller(seller);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSeller(null);
    };

    const handleViewProfile = (seller: Seller) => {
        setViewingProfileSeller(seller);
    };

    const handleBackFromProfile = () => {
        setViewingProfileSeller(null);
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                {/* Back Button */}
                <Link
                    href="/buyers/buy-requests"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#144E42] mb-6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Back
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-black font-parkinsans">
                        Buy Request #{id}
                    </h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.push(`/buyers/buy-requests/create?edit=${id}`)}
                            className="px-6 py-2.5 bg-[#B8EE7D] text-[#144E42] font-semibold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                        >
                            Edit Request
                        </button>
                        <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {viewingProfileSeller ? (
                    <SellerProfile
                        seller={viewingProfileSeller}
                        onBack={handleBackFromProfile}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Request Details */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                {/* Image */}
                                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                                    <Image
                                        src={requestData.image}
                                        alt={requestData.materialType}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-black font-parkinsans">
                                                {requestData.materialType}
                                            </h3>
                                            <p className="text-sm font-bold text-black mt-1">
                                                {requestData.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-xs text-gray-500 justify-end">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-3 h-3 text-green-600"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {requestData.location}
                                            </div>
                                            <p className="text-sm font-bold text-black mt-1">
                                                {requestData.priceRange}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">
                                                Preferred Quality
                                            </span>
                                            <span className="text-black font-medium">
                                                {requestData.preferredQuality}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">
                                                Uploaded Images
                                            </span>
                                            <button className="text-gray-500 underline font-medium hover:text-[#144E42]">
                                                View Images
                                            </button>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">
                                                Date Created
                                            </span>
                                            <span className="text-black font-medium">
                                                {requestData.dateCreated}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">Note</span>
                                            <span className="text-black font-medium">
                                                {requestData.note}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors mt-2">
                                        Re-Upload this Request
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Interested Sellers */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm min-h-[500px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-black font-parkinsans">
                                        Interested Sellers
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        ({offersCount} sellers' request)
                                    </span>
                                </div>

                                {hasOffers ? (
                                    <InterestedSellersList
                                        sellers={dummySellers.slice(0, offersCount)}
                                        onAcceptOffer={handleAcceptOffer}
                                        onViewProfile={handleViewProfile}
                                    />
                                ) : (
                                    <EmptyInterestedSellers />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Accept Offer Modal */}
            <AcceptOfferModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                seller={selectedSeller}
            />
        </div>
    );
}
