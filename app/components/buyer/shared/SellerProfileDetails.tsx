import React from "react";
import Image from "next/image";
import { Seller } from "../buy-requests/InterestedSellersList";

interface SellerProfileDetailsProps {
    seller: Seller;
}

export default function SellerProfileDetails({ seller }: SellerProfileDetailsProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50">
            {/* Seller Statistics */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-black mb-4 font-parkinsans">Seller Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Fulfillment Rate</p>
                        <p className="text-xl font-bold text-[#144E42]">100%</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Completed Order</p>
                        <p className="text-xl font-bold text-[#144E42]">50</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Active Listings</p>
                        <p className="text-xl font-bold text-[#144E42]">2</p>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-black mb-2 font-parkinsans">Location</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white w-full p-4 rounded-lg border border-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-green-600"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {seller.location}
                </div>
            </div>

            {/* Profile Information */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-black mb-2 font-parkinsans">Profile Information</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-white w-full p-4 rounded-lg border border-gray-100">
                    We are the best recycling student hub supplying loads from PET, HDPE, and scrap metals verified
                    bought direct buyers. We are a fast-growing waste hub managing over 100 tons of waste
                    daily to make our regions clean. We are also into buying and selling.
                </p>
            </div>

            {/* Networking */}
            <div>
                <h3 className="text-sm font-bold text-black mb-4 font-parkinsans">Active Listing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white w-full p-4 rounded-lg border border-gray-100">
                    {/* Item 1 */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src="/images/pet-bottles.jpg"
                                alt="PET Bottles"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-black font-parkinsans">
                                    PET Bottles
                                </span>
                            </div>
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    Weight: <span className="font-semibold">200kg</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Price: <span className="font-semibold">N1,000/kg</span>
                                </p>
                            </div>
                            <button className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors text-center inline-block">
                                Make an Offer
                            </button>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src="/images/pet-bottles.jpg"
                                alt="Mixed"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-black font-parkinsans">
                                    Mixed
                                </span>
                            </div>
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    Weight: <span className="font-semibold">10,000kg</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Price: <span className="font-semibold">N500/kg</span>
                                </p>
                            </div>
                            <button className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors text-center inline-block">
                                Make an Offer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
