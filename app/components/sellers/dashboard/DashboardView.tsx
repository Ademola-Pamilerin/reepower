"use client";

import React from "react";
import DashboardHeader from "./DashboardHeader";
import WalletCard from "./WalletCard";
import StatsCards from "./StatsCards";
import WeeklySalesTrend from "./WeeklySalesTrend";
import TopLevelBar from "./TopLevelBar";
import EarningsChart from "./EarningsChart";
import RecentActivity from "./RecentActivity";
import RecentOffersTable from "./RecentOffersTable";
import RecentOrdersTable from "./RecentOrdersTable";
import InventorySummaryTable from "./InventorySummaryTable";
import RecentBuyerRequest from "./RecentBuyerRequest";

export default function DashboardView() {
    // Sample data for weekly sales trend
    const salesData = [
        { day: "Mon", sales: 30 },
        { day: "Tue", sales: 45 },
        { day: "Wed", sales: 35 },
        { day: "Thu", sales: 50 },
        { day: "Fri", sales: 40 },
        { day: "Sat", sales: 55 },
        { day: "Sun", sales: 48 },
    ];

    // Sample data for top level bar
    const topLevelItems = [
        { name: "Acrylic Item Cores", category: "Cheap or High technology", percentage: 75 },
        { name: "HDPE Bottles", category: "Cheap or High technology", percentage: 60 },
        { name: "LDPE Films", category: "Cheap or High technology", percentage: 85 },
    ];

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
            message: "Oromuno Okiemute is requesting offer",
            time: "Just now",
            icon: "📦",
        },
        {
            id: 2,
            type: "offer",
            message: "adeOfiha has placed an offer",
            time: "3hrs ago",
            icon: "💰",
        },
        {
            id: 3,
            type: "order",
            message: "New buyer requested for 2000 bottles",
            time: "3hrs ago",
            icon: "✅",
        },
        {
            id: 4,
            type: "policy",
            message: "Stock for HDPE Bottles is running low (20kg left)",
            time: "1hr ago",
            icon: "⚠️",
        },
    ];

    // Sample recent offers data
    const recentOffers = [
        {
            headerRequest: "PET Bottles (100kg)",
            buyerLocation: "Yaba, Lagos",
            buyerOffer: "200kg | NGN 2,500/kg",
            myOfferPrice: "NGN 5,000/kg",
            indianDeal: "23rd June 2025",
            status: "Accepted",
        },
        {
            headerRequest: "PET Bottles (100kg)",
            buyerLocation: "Yaba, Lagos",
            buyerOffer: "200kg | NGN 2,500/kg",
            myOfferPrice: "NGN 5,000/kg",
            indianDeal: "23rd June 2025",
            status: "Pending",
        },
        {
            headerRequest: "PET Bottles (100kg)",
            buyerLocation: "Yaba, Lagos",
            buyerOffer: "200kg | NGN 2,500/kg",
            myOfferPrice: "NGN 5,000/kg",
            indianDeal: "23rd June 2025",
            status: "Rejected",
        },
    ];

    // Sample recent orders data
    const recentOrders = [
        {
            requestId: "REQ123",
            buyerName: "Oromuno Okiemute",
            material: "PET Bottles",
            qty: "50kg",
            pricePerKg: "NGN 5,000",
            amountPaid: "NGN 5,000",
            dateCreated: "23rd Jun 2025",
            status: "Active",
        },
        {
            requestId: "REQ123",
            buyerName: "Oromuno Okiemute",
            material: "PET Bottles",
            qty: "50kg",
            pricePerKg: "NGN 5,000",
            amountPaid: "NGN 5,000",
            dateCreated: "23rd Jun 2025",
            status: "Active",
        },
        {
            requestId: "REQ123",
            buyerName: "Oromuno Okiemute",
            material: "PET Bottles",
            qty: "50kg",
            pricePerKg: "NGN 5,000",
            amountPaid: "NGN 5,000",
            dateCreated: "23rd Jun 2025",
            status: "Active",
        },
    ];

    // Sample inventory summary data
    const inventoryItems = [
        {
            headedRequest: "PET Bottles",
            stockQuantity: "200kg",
            remainingQty: "100kg",
            noOfOrders: 8,
            defaultPricePerKg: "NGN 5,000/kg",
            submitted: "23rd June 2025",
            status: "Available",
            statusColor: "green" as const,
        },
        {
            headedRequest: "PET Bottles",
            stockQuantity: "500kg",
            remainingQty: "0kg",
            noOfOrders: 50,
            defaultPricePerKg: "NGN 5,000/kg",
            submitted: "23rd June 2025",
            status: "Out of Stock",
            statusColor: "red" as const,
        },
        {
            headedRequest: "PET Bottles",
            stockQuantity: "200kg",
            remainingQty: "50kg",
            noOfOrders: 10,
            defaultPricePerKg: "NGN 5,000/kg",
            submitted: "23rd June 2025",
            status: "Low Stock",
            statusColor: "yellow" as const,
        },
    ];

    // Sample buyer requests data
    const buyerRequests = [
        {
            id: "1",
            location: "Akolea Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "100kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
        {
            id: "2",
            location: "Akolea Lagos",
            productName: "Pet Plastics",
            quantityNeeded: "100kg Needed",
            pricePerKg: "NGN2,500/kg",
            image: "/images/pet-bottles.jpg",
        },
    ];

    return (
        <div className="w-full bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                <DashboardHeader />
                <WalletCard />
                <StatsCards />

                {/* Weekly Sales and Top Level Bar Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <WeeklySalesTrend data={salesData} />
                    <TopLevelBar items={topLevelItems} />
                </div>

                {/* Earnings Chart and Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <EarningsChart data={earningsData} />
                    <RecentActivity activities={recentActivity} />
                </div>

                <RecentOffersTable offers={recentOffers} />
                <RecentOrdersTable orders={recentOrders} />
                <InventorySummaryTable items={inventoryItems} />
                <RecentBuyerRequest requests={buyerRequests} />
            </div>
        </div>
    );
}
