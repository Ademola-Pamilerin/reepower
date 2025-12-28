import React from "react";

export default function SearchFilterBar() {
    return (
        <div className=" mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input with Add Button */}
                <div className="flex-1 flex gap-3 items-center">
                    <div className="relative flex-1 border border-gray-300 rounded-lg">
                        <input
                            type="text"
                            placeholder="Search for product"
                            className="w-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#144E42] font-parkinsans text-sm placeholder:text-black/30  text-black/70 "
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </div>
                    <button className="px-6 py-2.5 bg-[#B8EE7D] text-black rounded-lg font-parkinsans font-semibold hover:bg-[#a8de6d] transition-colors whitespace-nowrap flex items-center gap-2">
                        Add to Product Inventory
                        <span className="text-lg">+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


// This is what the offer and when you click upload offer you go to the second card with confirm edit and edit which goes back to the first modal which shows the image and then the content under with quatity under also

