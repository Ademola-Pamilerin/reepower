"use client";

import React from "react";
import DashboardHeader from "./DashboardHeader";
import WalletCard from "./WalletCard";
import StatsCards from "./StatsCards";
import EarningsChart from "./EarningsChart";
import RecentActivity from "./RecentActivity";
import RecentRequestsTable from "./RecentRequestsTable";
import OngoingOrdersTable from "./OngoingOrdersTable";

export default function DashboardView() {
    // Sample data for the earnings chart
    const earningsData = [
        { day: "Mon", amount: 4500 },
        { day: "Tue", amount: 6200 },
        { day: "Wed", amount: 5800 },
        { day: "Thu", amount: 6500 },
        { day: "Fri", amount: 5200 },
        { day: "Sat", amount: 4800 },
        { day: "Sun", amount: 7500 },
    ];

    // Sample recent activity data
    const recentActivity = [
        {
            id: 1,
            type: "request",
            message: "You just requested 5,000 PET bottles",
            time: "Just now",
            icon: "📦",
        },
        {
            id: 2,
            type: "offer",
            message: "You've received an offer of ₦50 from Ade Ofiha",
            time: "3hrs ago",
            icon: "💰",
        },
        {
            id: 3,
            type: "order",
            message: "OmorunoOkieCo finished your order (Bottle for...",
            time: "3hrs ago",
            icon: "✅",
        },
        {
            id: 4,
            type: "policy",
            message: "Response policy update available",
            time: "1hr ago",
            icon: "📋",
        },
    ];

    // Sample recent requests data
    const recentRequests = [
        {
            id: "REQ123",
            commodityType: "PET Bottles",
            qty: "50Kg",
            budget: "NGN 5,000 - NGN 10,000",
            dateCreated: "23rd June 2025",
            offers: 5,
        },
        {
            id: "REQ123",
            commodityType: "PET Bottles",
            qty: "50Kg",
            budget: "NGN 5,000 - NGN 10,000",
            dateCreated: "23rd June 2025",
            offers: 5,
        },
        {
            id: "REQ123",
            commodityType: "PET Bottles",
            qty: "50Kg",
            budget: "NGN 5,000 - NGN 10,000",
            dateCreated: "23rd June 2025",
            offers: 5,
        },
    ];

    // Sample ongoing orders data
    const ongoingOrders = [
        {
            id: "REQ123",
            sellerName: "Oromuno Okiemute",
            material: "PET Bottles",
            finalPrice: "NGN 5,000",
            dateCreated: "23rd June 2025",
            transType: "Request",
            qty: "50kg",
            status: "Active",
        },
        {
            id: "REQ123",
            sellerName: "Oromuno Okiemute",
            material: "PET Bottles",
            finalPrice: "NGN 5,000",
            dateCreated: "23rd June 2025",
            transType: "Direct",
            qty: "50kg",
            status: "Active",
        },
    ];

    return (
        <div className="w-full bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                <DashboardHeader />
                <WalletCard />
                <StatsCards />

                {/* Chart and Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <EarningsChart data={earningsData} />
                    <RecentActivity activities={recentActivity} />
                </div>

                <RecentRequestsTable requests={recentRequests} />
                <OngoingOrdersTable orders={ongoingOrders} />
            </div>
        </div>
    );
}
