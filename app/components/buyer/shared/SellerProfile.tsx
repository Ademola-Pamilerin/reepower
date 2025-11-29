import React, { useState } from "react";
import Image from "next/image";
import { Seller } from "../buy-requests/InterestedSellersList";
import SellerProfileDetails from "./SellerProfileDetails";
import SellerMessage from "./SellerMessage";
import SellerReportModal from "./SellerReportModal";

interface SellerProfileProps {
    seller: Seller;
    onBack: () => void;
}

type ViewState = "details" | "message";

export default function SellerProfile({ seller, onBack }: SellerProfileProps) {
    const [currentView, setCurrentView] = useState<ViewState>("details");
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Back Button */}
            <button
                onClick={onBack}
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
                Seller's Profile
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Sidebar */}
                <div className="w-full md:w-96 shrink-0 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-[#FAFAFA] rounded-xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex flex-col ">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
                                <Image
                                    src={seller.image}
                                    alt={seller.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex items-center justify-between border-b-2 border-black/10 mb-8 pb-8" >
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl font-semibold text-black font-parkinsans">
                                        {seller.name}
                                    </h2>
                                    <p className="text-base text-gray-500">
                                        Avg response time: <span className="text-black font-medium ml-1">2mins</span>
                                    </p>

                                </div>
                                <span className="px-5 py-2  border-2 border-[#144E42] text-[#144E42] text-sm font-medium rounded-lg bg-white">
                                    Verified
                                </span>

                            </div>

                            <div className="w-full space-y-3">
                                <button
                                    onClick={() => setCurrentView("details")}
                                    className={`w-full px-5 py-4 text-base text-start font-medium rounded-lg transition-colors font-parkinsans ${currentView === "details"
                                        ? "bg-[#144E42] text-white hover:bg-[#0e3a31]"
                                        : "bg-[#EAEAEA] text-gray-400 hover:bg-gray-100"
                                        }`}
                                >
                                    Profile Details
                                </button>
                                <button
                                    onClick={() => setCurrentView("message")}
                                    className={`w-full px-5 py-4 text-base text-start font-medium rounded-lg transition-colors font-parkinsans ${currentView === "message"
                                        ? "bg-[#144E42] text-white hover:bg-[#0e3a31]"
                                        : "bg-[#EAEAEA] text-gray-400 hover:bg-gray-100"
                                        }`}
                                >
                                    Message
                                </button>
                                <button
                                    onClick={() => setIsReportModalOpen(true)}
                                    className="w-full px-5 py-4 text-base text-start font-medium rounded-lg bg-[#EAEAEA] text-gray-400 hover:bg-gray-100 transition-colors font-parkinsans"
                                >
                                    Report Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 w-full bg-gray-50 rounded-xl border border-gray-100 p-6 shadow-sm min-h-[600px]">
                    {currentView === "details" ? (
                        <SellerProfileDetails seller={seller} />
                    ) : (
                        <SellerMessage seller={seller} />
                    )}
                </div>
            </div>

            {/* Report Modal */}
            <SellerReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
            />
        </div>
    );
}
