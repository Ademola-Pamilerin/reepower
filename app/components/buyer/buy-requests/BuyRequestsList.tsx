"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBuyRequests } from "../../../context/BuyRequestsContext";

export default function BuyRequestsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const { requests: buyRequests } = useBuyRequests();

  const filteredRequests = buyRequests.filter((req) => {
    const matchesSearch = req.materialType
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "All") return true;
    if (activeTab === "Active Offers") return req.status === "Active" && req.offers > 0;
    if (activeTab === "Zero Offers") return req.offers === 0;
    if (activeTab === "Expired Offer") return req.status === "Expired";

    return true;
  });

  const tabs = ["All", "Active Offers", "Zero Offers", "Expired Offer"];

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
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setActiveTab(tab)}
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
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => router.push(`/buyers/buy-requests/${request.id}`)}
                      className="grid grid-cols-7  bg-[#FAFAFA] py-6 my-4 rounded-lg px-6 text-sm text-gray-700 items-center hover:bg-gray-50 transition-colors cursor-pointer text-center"
                    >
                      <div className="col-span-1 font-medium">#{request.id}</div>
                      <div className="col-span-1 font-medium text-black">
                        {request.materialType}
                      </div>
                      <div className="col-span-1">{request.quantity}kg</div>
                      <div className="col-span-1">
                        ₦{Number(request.priceMin).toLocaleString()} - ₦{Number(request.priceMax).toLocaleString()}
                      </div>
                      <div className="col-span-1">{request.dateCreated}</div>
                      <div className="col-span-1 flex justify-center">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${request.offers > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {request.offers} Offers
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
        </div>
      </div>
    </div>
  );
}
