import React from "react";
import Link from "next/link";

interface Request {
    id?: string;
    commodity_type?: string;
    commodityType?: string;
    qty?: string;
    budget?: string;
    date_created?: string;
    dateCreated?: string;
    offers?: number;
}

interface RecentRequestsTableProps {
    requests: Request[];
}

export default function RecentRequestsTable({ requests }: RecentRequestsTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Recent Requests
                    </h2>
                    <Link
                        href="/buyers/buy-requests"
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
                                Request ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Commodity Type
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Qty
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Budget
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Date Created
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Offers
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.map((request, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.commodityType}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.qty}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.budget}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.dateCreated}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {request.offers}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button className="px-4 py-1.5 bg-[#B8EE7D] text-[#144E42] rounded-lg font-parkinsans font-semibold hover:bg-[#a3d96b] transition-colors text-xs">
                                        Action
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
