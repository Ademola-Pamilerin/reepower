"use client";

import Link from "next/link";
import Image from "next/image";

interface TrackOrderDetailsProps {
    id: string;
}

export default function TrackOrderDetails({ id }: TrackOrderDetailsProps) {
    // Dummy Data
    const orderData = {
        id: id,
        materialType: "PET Bottles",
        quantity: "5,000Kg",
        price: "₦1,000,000",
        location: "Akoka, Lagos",
        sellerName: "Musala Recycle",
        date: "May 23rd",
        time: "12:20pm",
        image: "/images/pet-bottles.jpg",
    };

    const timelineSteps = [
        {
            title: "Payment Received",
            date: "May 23rd",
            time: "12:20pm",
            status: "completed",
        },
        {
            title: "Seller Preparing Order",
            date: "May 23rd",
            time: "12:20pm",
            status: "active",
        },
        {
            title: "Ready for Pickup",
            date: "",
            time: "",
            status: "pending",
        },
        {
            title: "Product Loaded",
            date: "",
            time: "",
            status: "pending",
        },
        {
            title: "Seller Confirmed",
            date: "",
            time: "",
            status: "pending",
        },
        {
            title: "Order Completed",
            date: "",
            time: "",
            status: "pending",
        },
    ];

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
                    <button className="px-6 py-2.5 bg-[#B8EE7D] text-[#144E42] font-semibold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors">
                        Message Seller
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Order Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                                <Image
                                    src={orderData.image}
                                    alt={orderData.materialType}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-black font-parkinsans">
                                            {orderData.materialType}
                                        </h3>
                                        <p className="text-sm font-bold text-black mt-1">
                                            {orderData.quantity}
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
                                            {orderData.location}
                                        </div>
                                        <p className="text-sm font-bold text-black mt-1">
                                            {orderData.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-medium">Seller Name</span>
                                        <span className="text-black font-medium">
                                            {orderData.sellerName}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-medium">Date</span>
                                        <span className="text-black font-medium">
                                            {orderData.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-black font-parkinsans mb-6">
                                Track Order
                            </h2>

                            <div className="relative pl-4">
                                {/* Vertical Line */}
                                <div className="absolute left-[27px] top-2 bottom-10 w-0.5 bg-gray-200"></div>

                                <div className="space-y-8">
                                    {timelineSteps.map((step, index) => (
                                        <div key={index} className="relative flex items-start gap-6">
                                            {/* Icon */}
                                            <div className="relative z-10 shrink-0">
                                                {step.status === "completed" ? (
                                                    <div className="w-6 h-6 rounded-full bg-[#144E42] flex items-center justify-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-4 h-4 text-white"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                ) : step.status === "active" ? (
                                                    <div className="w-6 h-6 rounded-full border-2 border-[#B8EE7D] bg-white flex items-center justify-center">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-[#B8EE7D]"></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pt-0.5">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3
                                                            className={`font-bold text-sm ${step.status === "pending"
                                                                ? "text-gray-400"
                                                                : "text-black"
                                                                }`}
                                                        >
                                                            {step.title}
                                                        </h3>
                                                        {step.status === "active" && (
                                                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                                                In Progress
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(step.date || step.time) && (
                                                        <div className="text-right">
                                                            <p className="text-xs font-bold text-black">
                                                                {step.date}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {step.time}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <button className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors">
                                    Confirm Receipt of Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
