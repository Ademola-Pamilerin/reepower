import React from "react";
import Link from "next/link";

interface Offer {
    headerRequest: string;
    buyerLocation: string;
    buyerOffer: string;
    myOfferPrice: string;
    indianDeal: string;
    status: string;
}

interface RecentOffersTableProps {
    offers: Offer[];
}

export default function RecentOffersTable({ offers }: RecentOffersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Recent Offers
                    </h2>
                    <Link
                        href="#"
                        className="text-sm text-[#144E42] font-semibold hover:underline"
                    >
                        See All
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Header/Request
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Buyer's Location
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Buyer's Offer
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                My Offer Price
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Indian Deal
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {offers.map((offer, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {offer.headerRequest}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {offer.buyerLocation}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {offer.buyerOffer}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans font-semibold">
                                    {offer.myOfferPrice}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {offer.indianDeal}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                        {offer.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 bg-[#144E42] text-white rounded-lg font-parkinsans font-semibold hover:bg-[#1a6350] transition-colors text-xs">
                                            Edit
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
