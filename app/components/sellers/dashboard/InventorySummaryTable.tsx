import React from "react";
import Link from "next/link";

interface InventoryItem {
    headedRequest: string;
    icon?: string;
    stockQuantity: string;
    remainingQty: string;
    noOfOrders: number;
    defaultPricePerKg: string;
    submitted: string;
    status: string;
    statusColor: "green" | "red" | "yellow";
}

interface InventorySummaryTableProps {
    items: InventoryItem[];
}

export default function InventorySummaryTable({ items }: InventorySummaryTableProps) {
    const getStatusBadgeClass = (color: string) => {
        switch (color) {
            case "green":
                return "bg-green-100 text-green-700";
            case "red":
                return "bg-red-100 text-red-700";
            case "yellow":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black font-parkinsans">
                        Inventory/Orders Summary
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
                                Headed Request
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Stock Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Remaining Qty
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                No of Orders
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Default Price/kg
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black font-parkinsans">
                                Submitted
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
                        {items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>
                                        <span className="text-black font-parkinsans">{item.headedRequest}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {item.stockQuantity}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {item.remainingQty}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {item.noOfOrders}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans font-semibold">
                                    {item.defaultPricePerKg}
                                </td>
                                <td className="px-6 py-4 text-sm text-black font-parkinsans">
                                    {item.submitted}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(item.statusColor)}`}>
                                        {item.status}
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
