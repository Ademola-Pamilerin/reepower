"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBuyRequests } from "@/hooks/use-buyers";

export default function BuyRequestsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Build API params based on filters
  const apiParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: pageSize,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    // Map tab to status filter
    if (activeTab === "Active Offers") {
      params.status = "Active";
    } else if (activeTab === "Expired Offer") {
      params.status = "Expired";
    }

    return params;
  }, [currentPage, searchQuery, activeTab]);

  const { data, isLoading, error } = useBuyRequests(apiParams);

  // Client-side filtering for "Zero Offers" tab since API might not support it
  const filteredRequests = useMemo(() => {
    if (!data?.data) return [];

    if (activeTab === "Zero Offers") {
      return data.data.filter((req) => req.offers === 0);
    }

    return data.data;
  }, [data?.data, activeTab]);

  const tabs = ["All", "Active Offers", "Zero Offers", "Expired Offer"];

  // Reset to page 1 when filters change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 lg:py-8">
        {/* Header Section */}
        <div className="my-8">
          <h1 className="text-xl md:text-2xl font-bold text-black font-parkinsans">
            My Buy Request
          </h1>
        </div>

        {/* Search and Create Button */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for product"
              className="w-full px-4 py-3 pl-12 rounded-lg border border-black/20 focus:border-black/20 focus:ring-1 text-black/70 focus:ring-black/20 outline-none transition-all font-parkinsans text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <Link
            href="/buyers/buy-requests/create"
            className="px-6 py-3 rounded-lg bg-[#B8EE7D] font-parkinsans font-medium text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-[#144E42] hover:bg-[#a3d96b]"
          >
            Create New Buy Request +
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 lg:px-5 py-2.5 lg:py-3.5 cursor-pointer text-sm font-medium rounded-sm transition-colors font-parkinsans ${activeTab === tab
                ? "bg-[#144E42] text-white"
                : "bg-[#EAEAEA] text-black/50 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-7 bg-[#E8F5E9] py-6 px-6 text-sm font-semibold text-[#144E42] font-parkinsans text-center">
                <div className="col-span-1">Request ID</div>
                <div className="col-span-1">Commodity Type</div>
                <div className="col-span-1">Qty</div>
                <div className="col-span-1">Budget</div>
                <div className="col-span-1">Date Created</div>
                <div className="col-span-1">Offers</div>
                <div className="col-span-1">Action</div>
              </div>

              {/* Table Body */}
              <div className="">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <div className="w-12 h-12 border-4 border-[#144E42] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-sm text-gray-500 font-parkinsans">Loading buy requests...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 md:w-10 md:h-10 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-black mb-1 font-parkinsans">
                      Failed to load buy requests
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-4">
                      {error.message || "An error occurred while fetching your requests"}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-[#144E42] text-white rounded-lg text-sm font-parkinsans hover:bg-[#0f3a30]"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => router.push(`/buyers/buy-requests/${request.id}`)}
                      className="grid grid-cols-7  bg-[#FAFAFA] py-6 my-4 rounded-lg px-6 text-sm text-gray-700 items-center hover:bg-gray-50 transition-colors cursor-pointer text-center"
                    >
                      <div className="col-span-1 font-medium">{request.request_id || `#${request.id}`}</div>
                      <div className="col-span-1 font-medium text-black">
                        {request.material_type}
                      </div>
                      <div className="col-span-1">{request.qty_needed}kg</div>
                      <div className="col-span-1">
                        ₦{Number(request.min_price_per_kg).toLocaleString()} - ₦{Number(request.max_price_per_kg).toLocaleString()}
                      </div>
                      <div className="col-span-1">
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${request.offers && request.offers > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {request.offers || 0} Offers
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-center gap-3">
                        <div className="text-gray-400 hover:text-[#144E42]" title="View Details">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div
                          className="text-gray-400 hover:text-[#144E42]"
                          title="Edit Request"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/buyers/buy-requests/create?edit=${request.id}`);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 md:w-10 md:h-10 text-[#144E42]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-black mb-1 font-parkinsans">
                      You haven't created any buy request
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      All buy request you create would appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          {!isLoading && !error && data && data.pages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 font-parkinsans">
                Showing {filteredRequests.length > 0 ? ((currentPage - 1) * pageSize) + 1 : 0} to {Math.min(currentPage * pageSize, data.total)} of {data.total} requests
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-parkinsans font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, data.pages) }, (_, i) => {
                    let pageNum;
                    if (data.pages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= data.pages - 2) {
                      pageNum = data.pages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-parkinsans font-medium transition-colors ${currentPage === pageNum
                          ? "bg-[#144E42] text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(data.pages, prev + 1))}
                  disabled={currentPage === data.pages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-parkinsans font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
