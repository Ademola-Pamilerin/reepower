"use client";

import React from "react";
import DashboardHeader from "./DashboardHeader";
import WalletCard from "./WalletCard";
import StatsCards from "./StatsCards";
import EarningsChart from "./EarningsChart";
import RecentActivity from "./RecentActivity";
import RecentRequestsTable from "./RecentRequestsTable";
import OngoingOrdersTable from "./OngoingOrdersTable";
import { useBuyerDashboard } from "@/hooks/use-buyers";

export default function DashboardView() {
    const { data: apiResponse, isLoading, isError } = useBuyerDashboard();

    const earningsData = [
        { day: "Mon", amount: 4500 },
        { day: "Tue", amount: 6200 },
        { day: "Wed", amount: 5800 },
        { day: "Thu", amount: 6500 },
        { day: "Fri", amount: 5200 },
        { day: "Sat", amount: 4800 },
        { day: "Sun", amount: 7500 },
    ];

    if (isError) {
        return (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8">
                <p className="text-red-500 mb-4 font-parkinsans">Failed to load dashboard data.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-[#144E42] text-white rounded-lg"
                >
                    Retry
                </button>
            </div>
        );
    }

    const dashboardData = apiResponse?.data;
    const stats = dashboardData?.stats;
    const recentActivity = dashboardData?.recent_activity || [];
    const recentRequests = dashboardData?.recent_requests || [];
    const ongoingOrders = dashboardData?.recent_orders || [];

    return (
        <div className="w-full bg-white relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#144E42]"></div>
                </div>
            )}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                <DashboardHeader />
                <WalletCard />
                <StatsCards stats={stats} />

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
