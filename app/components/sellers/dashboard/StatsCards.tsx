import React from "react";

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Material Listed */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-3">Material Listed</p>
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-semibold text-black font-parkinsans">2000</p>
                    <button className="flex items-center gap-1 text-xs text-orange-600 font-semibold bg-orange-200 px-2 py-1 rounded hover:bg-orange-300 transition-colors">
                        view
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* In Stock */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-3">In Stock</p>
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-semibold text-black font-parkinsans">100</p>
                    <button className="flex items-center gap-1 text-xs text-purple-600 font-semibold bg-purple-200 px-2 py-1 rounded hover:bg-purple-300 transition-colors">
                        view
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Low Stock */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                <p className="text-sm text-gray-600 mb-3">Low Stock</p>
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-semibold text-black font-parkinsans">30</p>
                    <button className="flex items-center gap-1 text-xs text-pink-600 font-semibold bg-pink-200 px-2 py-1 rounded hover:bg-pink-300 transition-colors">
                        view
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Out of Stock */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                <p className="text-sm text-gray-600 mb-3">Out of Stock</p>
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-semibold text-black font-parkinsans">40</p>
                    <button className="flex items-center gap-1 text-xs text-teal-600 font-semibold bg-teal-200 px-2 py-1 rounded hover:bg-teal-300 transition-colors">
                        view
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
