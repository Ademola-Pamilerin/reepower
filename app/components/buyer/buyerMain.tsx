"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";

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

  // Dummy buyer data
  const buyerData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Ikeja",
    memberSince: "January 2024",
    totalPurchases: 45,
    rating: 4.8,
  };

  // Sample recyclable products data (expanded for pagination demo)
  const allRecyclableProducts: RecyclableItem[] = [
    {
      id: 1,
      image: "/images/pet-bottles.jpg",
      type: "PET bottles",
      weight: "200kg",
      price: "N1,000/kg",
      pricePerKg: 1000,
      seller: "Green Recyclers Ltd",
      location: "Lagos, Ikeja",
      condition: "Clean & Sorted",
      material: "PET Plastic",
      sellType: "Entire stock only",
      description: "High-quality PET bottles collected from various sources. All bottles are clean, sorted, and ready for recycling. Perfect for manufacturing companies looking for bulk recyclable materials.",
      availableWeight: 200,
    },
    {
      id: 2,
      image: "/images/bottle-container.jpg",
      type: "Aluminum cans",
      weight: "150kg",
      price: "N800/kg",
      pricePerKg: 800,
      seller: "EcoWaste Solutions",
      location: "Lagos, Victoria Island",
      condition: "Compressed",
      material: "Aluminum",
      sellType: "Entire stock only",
      description: "Compressed aluminum cans ready for recycling. All cans have been cleaned and compressed for easy transportation. Ideal for aluminum recycling facilities.",
      availableWeight: 150,
    },
    {
      id: 3,
      image: "/images/bottle-3.jpg",
      type: "Plastic containers",
      weight: "180kg",
      price: "N900/kg",
      pricePerKg: 900,
      seller: "Recycle Pro",
      location: "Lagos, Lekki",
      condition: "Mixed Grade",
      material: "HDPE/PP Plastic",
      sellType: "Entire stock only",
      description: "Mixed plastic containers including HDPE and PP materials. Suitable for various recycling processes. All containers are clean and free from contaminants.",
      availableWeight: 180,
    },
    {
      id: 4,
      image: "/images/dump.jpg",
      type: "Mixed recyclables",
      weight: "250kg",
      price: "N750/kg",
      pricePerKg: 750,
      seller: "Waste Masters",
      location: "Lagos, Surulere",
      condition: "Sorted",
      material: "Mixed Materials",
      sellType: "Entire stock only",
      description: "Assorted recyclable materials including plastics, metals, and paper. All materials have been sorted and categorized for easy processing.",
      availableWeight: 250,
    },
    {
      id: 5,
      image: "/images/pet-bottles.jpg",
      type: "PET bottles",
      weight: "300kg",
      price: "N1,200/kg",
      pricePerKg: 1200,
      seller: "Clean Earth Co",
      location: "Lagos, Yaba",
      condition: "Premium Grade",
      material: "PET Plastic",
      sellType: "Entire stock only",
      description: "Premium quality PET bottles in excellent condition. These bottles are thoroughly cleaned and sorted, making them perfect for high-grade recycling applications.",
      availableWeight: 300,
    },
    {
      id: 6,
      image: "/images/bottle-container.jpg",
      type: "Aluminum cans",
      weight: "220kg",
      price: "N950/kg",
      pricePerKg: 950,
      seller: "Recycle Hub",
      location: "Lagos, Ajah",
      condition: "Baled",
      material: "Aluminum",
      sellType: "Entire stock only",
      description: "Baled aluminum cans ready for immediate processing. All cans are clean and compressed into convenient bales for transportation and storage.",
      availableWeight: 220,
    },
    {
      id: 7,
      image: "/images/bottle-3.jpg",
      type: "Plastic containers",
      weight: "190kg",
      price: "N1,100/kg",
      pricePerKg: 1100,
      seller: "Green Solutions",
      location: "Lagos, Maryland",
      condition: "Clean",
      material: "HDPE Plastic",
      sellType: "Entire stock only",
      description: "Clean HDPE plastic containers suitable for various recycling applications. All containers are free from labels and contaminants.",
      availableWeight: 190,
    },
    {
      id: 8,
      image: "/images/dump.jpg",
      type: "Mixed recyclables",
      weight: "280kg",
      price: "N850/kg",
      pricePerKg: 850,
      seller: "Eco Partners",
      location: "Lagos, Ikoyi",
      condition: "Pre-sorted",
      material: "Mixed Materials",
      sellType: "Entire stock only",
      description: "Pre-sorted mixed recyclables including various types of plastics and metals. Ready for further processing and recycling.",
      availableWeight: 280,
    },
    {
      id: 9,
      image: "/images/pet-bottles.jpg",
      type: "PET bottles",
      weight: "175kg",
      price: "N1,050/kg",
      pricePerKg: 1050,
      seller: "Recycle Masters",
      location: "Lagos, Gbagada",
      condition: "Sorted & Clean",
      material: "PET Plastic",
      sellType: "Entire stock only",
      description: "Well-sorted and cleaned PET bottles ready for recycling. Excellent quality materials suitable for manufacturing new products.",
      availableWeight: 175,
    },
    {
      id: 10,
      image: "/images/bottle-container.jpg",
      type: "Aluminum cans",
      weight: "195kg",
      price: "N875/kg",
      pricePerKg: 875,
      seller: "Green Earth Ltd",
      location: "Lagos, Festac",
      condition: "Crushed",
      material: "Aluminum",
      sellType: "Entire stock only",
      description: "Crushed aluminum cans ready for melting and recycling. All cans are clean and free from non-aluminum materials.",
      availableWeight: 195,
    },
    {
      id: 11,
      image: "/images/bottle-3.jpg",
      type: "Plastic containers",
      weight: "210kg",
      price: "N950/kg",
      pricePerKg: 950,
      seller: "Eco Waste Co",
      location: "Lagos, Apapa",
      condition: "Standard",
      material: "PP Plastic",
      sellType: "Entire stock only",
      description: "Standard grade PP plastic containers suitable for recycling. All containers are clean and ready for processing.",
      availableWeight: 210,
    },
    {
      id: 12,
      image: "/images/dump.jpg",
      type: "Mixed recyclables",
      weight: "265kg",
      price: "N800/kg",
      pricePerKg: 800,
      seller: "Waste Solutions",
      location: "Lagos, Mushin",
      condition: "Sorted",
      material: "Mixed Materials",
      sellType: "Entire stock only",
      description: "Sorted mixed recyclables including plastics, paper, and metals. All materials are categorized and ready for recycling.",
      availableWeight: 265,
    },
    {
      id: 13,
      image: "/images/pet-bottles.jpg",
      type: "PET bottles",
      weight: "225kg",
      price: "N1,150/kg",
      pricePerKg: 1150,
      seller: "Clean Recyclers",
      location: "Lagos, Oshodi",
      condition: "Premium",
      material: "PET Plastic",
      sellType: "Entire stock only",
      description: "Premium PET bottles in excellent condition. Perfect for high-quality recycling applications and manufacturing.",
      availableWeight: 225,
    },
    {
      id: 14,
      image: "/images/bottle-container.jpg",
      type: "Aluminum cans",
      weight: "185kg",
      price: "N925/kg",
      pricePerKg: 925,
      seller: "Recycle Hub Pro",
      location: "Lagos, Badagry",
      condition: "Compressed",
      material: "Aluminum",
      sellType: "Entire stock only",
      description: "Compressed aluminum cans ready for recycling. All materials are clean and properly prepared for processing.",
      availableWeight: 185,
    },
    {
      id: 15,
      image: "/images/bottle-3.jpg",
      type: "Plastic containers",
      weight: "205kg",
      price: "N1,025/kg",
      pricePerKg: 1025,
      seller: "Green Partners",
      location: "Lagos, Epe",
      condition: "Clean & Sorted",
      material: "HDPE Plastic",
      sellType: "Entire stock only",
      description: "Clean and sorted HDPE plastic containers. All materials are free from contaminants and ready for recycling.",
      availableWeight: 205,
    },
    {
      id: 16,
      image: "/images/dump.jpg",
      type: "Mixed recyclables",
      weight: "290kg",
      price: "N775/kg",
      pricePerKg: 775,
      seller: "Eco Solutions Ltd",
      location: "Lagos, Ikorodu",
      condition: "Pre-sorted",
      material: "Mixed Materials",
      sellType: "Entire stock only",
      description: "Pre-sorted mixed recyclables ready for further processing. Includes various types of recyclable materials.",
      availableWeight: 290,
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(allRecyclableProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allRecyclableProducts.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#144E42] font-parkinsans">
            Buyers Market place
          </h1>
        </div>

        {/* Buyer Info Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#144E42] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#144E42] font-parkinsans mb-1">
                  {buyerData.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    {buyerData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    {buyerData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
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
                    {buyerData.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#144E42] font-parkinsans">
                  {buyerData.totalPurchases}
                </p>
                <p className="text-sm text-gray-600">Total Purchases</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#144E42] font-parkinsans flex items-center gap-1">
                  {buyerData.rating}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Member Since
                </p>
                <p className="text-sm text-gray-600">{buyerData.memberSince}</p>
              </div>
            </div>
          </div>
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
          <button className="px-6 py-3 rounded-lg bg-[#B8EE7D] font-parkinsans font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-[#144E42]">
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
          </button>
        </div>

        {/* Products Grid Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#144E42] font-parkinsans mb-6">
            Available Recyclables
          </h2>
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
                  {/* Location - First */}
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

                  {/* Product Name - Second */}
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

                  {/* Weight and Price side by side - Third */}
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium md:font-semibold">{item.weight}</span>
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium md:font-semibold">{item.price}</span>
                    </p>
                  </div>

                  {/* Seller - Fourth */}
                  <p className="text-xs md:text-sm text-gray-600 mb-3 truncate">
                    Seller: <span className="font-medium md:font-semibold">{item.seller}</span>
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

          {/* Pagination */}
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${
                  currentPage === 1
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

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`min-w-[40px] px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${
                    page === currentPage
                      ? "bg-[#144E42] text-white"
                      : page === "..."
                      ? "bg-white text-gray-400 cursor-default"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${
                  currentPage === totalPages
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
        </div>

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
