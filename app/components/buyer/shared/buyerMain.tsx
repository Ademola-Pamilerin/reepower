"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { useBuyerRequests } from "@/hooks/use-marketplace";
import { toast } from "sonner";

interface RecyclableItem {
  id: number;
  image: string;
  type: string;
  weight: string;
  price: string;
  pricePerKg: number;
  seller: string;
  location: string;
  condition: string;
  material: string;
  sellType: string;
  description: string;
  availableWeight: number;
  minPrice?: string | number;
  maxPrice?: string | number;
}

const BuyerContentFile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<RecyclableItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const handleProductClick = (product: RecyclableItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const { data: apiResponse, isLoading, isError, error } = useBuyerRequests(currentPage, itemsPerPage);

  const currentProducts: RecyclableItem[] = (apiResponse?.data || []).map((req: any) => ({
    id: req.id,
    image: req.image || "/images/pet-bottles.jpg",
    type: req.material_type || "Unknown Material",
    weight: req.qty_needed ? `${req.qty_needed}kg` : "N/A",
    price: req.min_price_per_kg && req.max_price_per_kg 
      ? `N${Number(req.min_price_per_kg).toLocaleString()} - N${Number(req.max_price_per_kg).toLocaleString()}`
      : "Negotiable",
    pricePerKg: Number(req.min_price_per_kg) || 0,
    seller: req.buyer?.name || req.user?.business_name || req.user?.name || `User #${req.user_id}`,
    location: req.location || "Lagos",
    condition: req.status || "Active",
    material: req.material_type || "Recyclable",
    sellType: "Contact Buyer",
    description: req.description || `Buyer Request ID: ${req.request_id}`,
    availableWeight: Number(req.qty_needed) || 0,
    minPrice: req.min_price_per_kg,
    maxPrice: req.max_price_per_kg,
  }));

  const totalPages = apiResponse?.pages || 1;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (isError) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8">
        <p className="text-red-500 mb-4 font-parkinsans">Failed to load buyer requests.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#144E42] text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
        {isLoading && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#144E42]"></div>
          </div>
        )}
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#144E42] font-parkinsans">
            Buyers Market place
          </h1>
        </div>

        {/* Search and Create Button Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recyclables, sellers, or locations..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans text-black"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          <Link href="/buyers/buy-requests/create" className="px-6 py-3 rounded-lg bg-[#B8EE7D] font-parkinsans font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-[#144E42]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create New Buy Request
          </Link>
        </div>

        {/* Products Grid Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#144E42] font-parkinsans mb-6">
            Buyer Requests
          </h2>
          {currentProducts.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-parkinsans">No buyer requests found at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative w-full h-[140px] sm:h-[180px] md:h-[200px]">
                    <Image
                      src={item.image}
                      alt={item.type}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-2 sm:p-3 md:p-4">
                    <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <span className="font-medium md:font-semibold truncate">{item.location}</span>
                    </p>

                    <div className="flex items-center gap-1.5 md:gap-2 mb-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                      <span className="text-xs md:text-sm font-medium md:font-semibold text-black font-parkinsans truncate">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs md:text-sm text-gray-600">
                        <span className="font-medium md:font-semibold">{item.weight}</span>
                      </p>
                      <div className="text-right">
                        {item.minPrice && item.maxPrice ? (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase leading-none">Range</span>
                            <span className="text-[11px] md:text-xs font-bold text-green-700">
                              N{Number(item.minPrice).toLocaleString()} - N{Number(item.maxPrice).toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs md:text-sm text-gray-600">
                            <span className="font-medium md:font-semibold">{item.price}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-3 truncate">
                      Buyer: <span className="font-medium md:font-semibold">{item.seller}</span>
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(item);
                      }}
                      className="w-full px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-green-600 text-white font-parkinsans font-medium md:font-semibold hover:bg-green-700 transition-colors text-center text-xs md:text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  disabled={page === "..."}
                  className={`min-w-[40px] px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${page === currentPage
                      ? "bg-[#144E42] text-white"
                      : page === "..."
                        ? "bg-white text-gray-400 cursor-default"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default BuyerContentFile;
