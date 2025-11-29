import React from "react";
import Link from "next/link";

interface Order {
    id: string;
    sellerName: string;
    material: string;
    finalPrice: string;
    dateCreated: string;
    transType: string;
    qty: string;
    status: string;
}

interface OngoingOrdersTableProps {
    orders: Order[];
}

export default function OngoingOrdersTable({ orders }: OngoingOrdersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Ongoing Orders
                    </h2>
                    <Link
                        href="/buyers/orders"
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
                                Seller Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Material
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Final Price
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Date Created
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Trans Type
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Qty
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
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.sellerName}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.material}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans font-semibold">
                                    {order.finalPrice}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.dateCreated}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.transType}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {order.qty}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF9C4] text-[#F57F17]">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="relative group">
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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
