"use client";

import { useState } from "react";
import { Order } from "./types";
import OrdersActions from "./OrdersActions";
import OrdersTabs from "./OrdersTabs";
import OrdersTable from "./OrdersTable";
import OrdersPagination from "./OrdersPagination";

export default function OrdersView() {
    const [activeTab, setActiveTab] = useState<"all" | "ongoing" | "completed">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Sample order data (expanded for pagination demo)
    const allOrders: Order[] = [
        {
            id: "1",
            requestId: "REQ123",
            sellerName: "Oromuno Okiemute",
            material: "PET bottles",
            finalPrice: "NGN 5,000",
            dateCreated: "23rd June 2025",
            transType: "Request",
            qty: "50kg",
            status: "Active",
        },
        {
            id: "2",
            requestId: "REQ124",
            sellerName: "Oromuno Okiemute",
            material: "PET bottles",
            finalPrice: "NGN 5,000",
            dateCreated: "23rd June 2025",
            transType: "Direct",
            qty: "50kg",
            status: "Active",
        },
        {
            id: "3",
            requestId: "REQ125",
            sellerName: "Green Recyclers Ltd",
            material: "Aluminum cans",
            finalPrice: "NGN 8,000",
            dateCreated: "20th June 2025",
            transType: "Request",
            qty: "75kg",
            status: "Completed",
        },
        {
            id: "4",
            requestId: "REQ126",
            sellerName: "EcoWaste Solutions",
            material: "Plastic containers",
            finalPrice: "NGN 6,500",
            dateCreated: "18th June 2025",
            transType: "Direct",
            qty: "60kg",
            status: "Completed",
        },
        {
            id: "5",
            requestId: "REQ127",
            sellerName: "Recycle Pro",
            material: "Mixed recyclables",
            finalPrice: "NGN 7,200",
            dateCreated: "15th June 2025",
            transType: "Request",
            qty: "80kg",
            status: "Active",
        },
        {
            id: "6",
            requestId: "REQ128",
            sellerName: "Waste Masters",
            material: "PET bottles",
            finalPrice: "NGN 4,800",
            dateCreated: "12th June 2025",
            transType: "Direct",
            qty: "45kg",
            status: "Completed",
        },
        {
            id: "7",
            requestId: "REQ129",
            sellerName: "Clean Earth Co",
            material: "Aluminum cans",
            finalPrice: "NGN 9,500",
            dateCreated: "10th June 2025",
            transType: "Request",
            qty: "90kg",
            status: "Active",
        },
        {
            id: "8",
            requestId: "REQ130",
            sellerName: "Recycle Hub",
            material: "Plastic containers",
            finalPrice: "NGN 5,600",
            dateCreated: "8th June 2025",
            transType: "Direct",
            qty: "55kg",
            status: "Completed",
        },
        {
            id: "9",
            requestId: "REQ131",
            sellerName: "Green Solutions",
            material: "Mixed recyclables",
            finalPrice: "NGN 6,800",
            dateCreated: "5th June 2025",
            transType: "Request",
            qty: "70kg",
            status: "Active",
        },
        {
            id: "10",
            requestId: "REQ132",
            sellerName: "Eco Partners",
            material: "PET bottles",
            finalPrice: "NGN 5,200",
            dateCreated: "3rd June 2025",
            transType: "Direct",
            qty: "52kg",
            status: "Completed",
        },
    ];

    const filteredOrders = allOrders.filter((order) => {
        const matchesTab =
            activeTab === "all" ? true :
                activeTab === "ongoing" ? order.status === "Active" :
                    order.status === "Completed";
        const matchesSearch =
            order.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.material.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, endIndex);

    // Reset to page 1 when tab or search changes
    const handleTabChange = (tab: "all" | "ongoing" | "completed") => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="w-full bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-parkinsans">
                        My Orders
                    </h1>
                </div>

                <OrdersActions searchQuery={searchQuery} setSearchQuery={handleSearchChange} />

                <OrdersTabs activeTab={activeTab} setActiveTab={handleTabChange} />

                <OrdersTable orders={currentOrders} />

                <OrdersPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}
