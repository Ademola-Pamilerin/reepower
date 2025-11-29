"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailModalProps {
  product: {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm md:text-base justify-between">
      <span className="text-gray-600 font-medium min-w-[100px] ">{label}:</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (product) setTotalPrice(quantity * product.pricePerKg);
  }, [quantity, product]);

  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "unset";
  //   return () => (document.body.style.overflow = "unset");
  // }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= product.availableWeight) setQuantity(value);
  };

  const handleBuy = () => {
    alert(
      `Purchasing ${quantity}kg of ${product.type
      } for ₦${totalPrice.toLocaleString()}`
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-7xl h-[85vh] lg:h-150 lg:w-[90vw] xl:w-[80vw] my-10 max-h-[90vh] overflow-y-scroll lg:overflow-hidden  flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full w-11/12">
              <button
                onClick={onClose}
                className="absolute top-4 right-4  z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col lg:flex-row w-full items-center justify-center md:px-4 py-10 h-full">
                <div className="w-full lg:w-2/5 relative h-full items-start flex flex-col px-4 justify-between">
                  <div className="relative w-full flex-1 h-[20vh] md:h-[30vh] lg:max-h-80 xl:max-h-96 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.type}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 w-full bg-white">
                    <button
                      className="p-1 md:p-2.5 rounded-full border border-gray-600 text-green-600 cursor-pointer shadow"
                      aria-label="Previous image"
                    >
                      <IoArrowBack size={20} />
                    </button>

                    <p className="text-[#424242]">1 of 4</p>

                    <button
                      className="p-1 md:p-2.5 rounded-full border border-gray-600 text-green-600 cursor-pointer shadow"
                      aria-label="Next image"
                    >
                      <IoArrowForward size={20} />
                    </button>
                  </div>
                </div>

                <div className="lg:w-3/5 px-1 md:px-8 lg:px-5 xl:px-8 flex flex-col pb-5 h-[300px] md:h-[300px] lg:h-auto">
                  <div className="flex items-center md:items-start justify-between gap-4 mb-6">
                    <h2 className="text-xl md:text-3xl font-bold text-[#144E42] font-parkinsans flex-1">
                      {product.type}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 md:w-5 md:h-5 text-[#144E42]"
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
                      <span className="text-sm font-medium">
                        {product.location}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 lg:space-y-2 xl:space-y-4 mb-6">
                    <Detail label="Condition" value={product.condition} />
                    <Detail label="Material" value={product.material} />
                    <Detail label="Sell Type" value={product.sellType} />
                  </div>

                  <div className=" ">
                    <h3 className="text-base md:text-lg font-bold text-[#144E42] mb-1 font-parkinsans">
                      Product Description
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {product.description.slice(0, 100)}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xl md:text-3xl font-bold text-[#144E42] font-parkinsans">
                          {product.availableWeight}kg
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          Available Stock
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-3xl font-bold text-[#144E42] font-parkinsans">
                          ₦{product.pricePerKg}/kg
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          Price per kg
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="quantity"
                          className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                        >
                          Enter Quantity (kg)
                        </label>
                        <div className="flex items-center w-full gap-4 lg:gap-0 justify-between">
                          <div className="w-6/10 md:w-7/10 md:min-w-40 flex px-4 py-3 border-gray-300 border rounded-lg focus-within:ring-2 focus-within:ring-[#144E42] focus-within:border-[#144E42]">
                            <input
                              type="text"
                              id="quantity"
                              min="1"
                              max={product.availableWeight}
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="flex-1 outline-none text-base md:text-lg font-semibold text-gray-900 w-1/2"
                            />
                            <p
                              className={`text-sm md:text-lg flex 2xl:text-xl font-bold text-[#144E42] font-parkinsans w-1/2 justify-end ${quantity ? "" : "invisible"
                                }`}
                            >
                              - ₦{totalPrice.toLocaleString()}
                            </p>
                          </div>
                          {/* <div className="text-right min-w-[120px]">
                           
                            <p className="text-xs text-gray-600">Total Price</p>
                          </div> */}

                          <button
                            onClick={handleBuy}
                            disabled={quantity <= 0}
                            className="px-4 2xl:px-5 py-4 rounded-lg bg-[#144E42] text-white font-parkinsans font-medium 2xl:font-semibold text-xs md:text-base 2xl:text-lg hover:bg-[#0f3a31] transition-colors disabled:text-[#164E43] disabled:opacity-40 disabled:bg-[#B8EE7D] disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                          >
                            Buy Now
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mb-4">
                          Max: {product.availableWeight}kg available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
