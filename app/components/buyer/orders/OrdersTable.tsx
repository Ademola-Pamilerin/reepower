import Link from "next/link";
import { Order } from "./types";

interface OrdersTableProps {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="min-h-[40rem] overflow-x-scroll overflow-y-hidden 2xl:overflow-x-hidden">
                <table className="w-full">
                    <thead className="bg-[#E8F5E9]">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Request ID
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Seller Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Material
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Final Price
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Date Created
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Trans Type
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Qty
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-black font-parkinsans">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                            {order.requestId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-4 h-4 text-gray-600"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                    />
                                                </svg>
                                            </div>
                                            {order.sellerName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        {order.material}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans font-semibold">
                                        {order.finalPrice}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        {order.dateCreated}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        {order.transType}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-parkinsans">
                                        {order.qty}
                                    </td>
                                    <td className="px-6 py-5 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Active"
                                                ? "bg-[#FFF9C4] text-[#F57F17]"
                                                : "bg-[#E8F5E9] text-[#2E7D32]"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-sm">
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
                                            {/* Dropdown menu */}
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                                <Link
                                                    href={`/buyers/orders/track-order/${order.id}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-parkinsans"
                                                >
                                                    Track Order
                                                </Link>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-parkinsans">
                                                    View Details
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-parkinsans">
                                                    Cancel Order
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
