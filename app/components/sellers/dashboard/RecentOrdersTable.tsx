import React from "react";
import Link from "next/link";

interface Order {
    requestId: string;
    buyerName: string;
    buyerAvatar?: string;
    material: string;
    qty: string;
    pricePerKg: string;
    amountPaid: string;
    dateCreated: string;
    status: string;
}

interface RecentOrdersTableProps {
    orders: Order[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Recent Orders
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
                                Request ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Buyer Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Material
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Qty
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Price/kg
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Amount Paid
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Date Created
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
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.requestId}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-xs font-semibold text-orange-700">
                                            {order.buyerName.charAt(0)}
                                        </div>
                                        <span className="text-black font-parkinsans">{order.buyerName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.material}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.qty}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.pricePerKg}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans font-semibold">
                                    {order.amountPaid}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.dateCreated}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
