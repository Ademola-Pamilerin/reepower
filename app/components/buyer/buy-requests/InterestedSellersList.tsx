
import React from "react";
import Image from "next/image";

export interface Seller {
    id: number;
    name: string;
    location: string;
    description: string;
    price: string;
    unitPrice: string;
    image: string;
    rating: number;
}

interface InterestedSellersListProps {
    sellers: Seller[];
    onAcceptOffer: (seller: Seller) => void;
    onViewProfile: (seller: Seller) => void;
}

export default function InterestedSellersList({
    sellers,
    onAcceptOffer,
    onViewProfile,
}: InterestedSellersListProps) {
    return (
        <div className="space-y-4">
            {sellers.map((seller) => (
                <div
                    key={seller.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                    {/* Seller Image */}
                    <div className="relative w-full sm:w-40 h-40 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={seller.image}
                            alt={seller.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                            <div className="w-full">
                                <div className="flex items-center gap-1 text-xs text-[#144E42] font-medium mb-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {seller.location}
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="w-1/2">
                                        <h3 className="font-semibold text-black font-parkinsans text-xl">
                                            {seller.name}
                                        </h3>
                                        <p className="text-base text-[#424242] mt-1">
                                            {seller.description}
                                        </p>
                                    </div>
                                    <div className="w-1/2 flex justify-end flex-col item-end">
                                        <p className="font-semibold text-black text-xl text-right">{seller.price}/{seller.unitPrice} </p>
                                        <p className="text-base text-[#424242] mt-1 text-right">NGN 50/KG</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => onViewProfile(seller)}
                                className="flex-1 py-2.5 border border-[#144E42] text-[#144E42] font-medium rounded-lg text-sm hover:bg-green-50 transition-colors font-parkinsans"
                            >
                                Seller's Details
                            </button>
                            <button
                                onClick={() => onAcceptOffer(seller)}
                                className="flex-1 py-2.5 bg-[#144E42] text-white font-medium rounded-lg text-sm hover:bg-[#0e3a31] transition-colors font-parkinsans"
                            >
                                Accept Offer
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
}
