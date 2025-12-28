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
    const { data, isLoading, error } = useBuyerDashboard();

    // Sample data for the earnings chart (keep this as it's not in the API response)
    const earningsData = [
        { day: "Mon", amount: 4500 },
        { day: "Tue", amount: 6200 },
        { day: "Wed", amount: 5800 },
        { day: "Thu", amount: 6500 },
        { day: "Fri", amount: 5200 },
        { day: "Sat", amount: 4800 },
        { day: "Sun", amount: 7500 },
    ];

    if (isLoading) {
        return (
            <div className="w-full bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14841E] mx-auto mb-4"></div>
                            <p className="text-gray-600 font-parkinsans">Loading dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="text-red-500 text-5xl mb-4">⚠️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-parkinsans">
                                Error Loading Dashboard
                            </h3>
                            <p className="text-gray-600 font-parkinsans">
                                {error.message || "Failed to load dashboard data"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const dashboardData = data?.data;
    const stats = dashboardData?.stats;
    const recentActivity = dashboardData?.recent_activity?.filter(item => Object.keys(item).length > 0) || [];
    const recentRequests = dashboardData?.recent_requests?.filter(item => Object.keys(item).length > 0) || [];
    const ongoingOrders = dashboardData?.recent_orders?.filter(item => Object.keys(item).length > 0) || [];

    return (
        <div className="w-full bg-white">
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
