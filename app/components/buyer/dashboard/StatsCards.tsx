import React from "react";

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Active Requests</p>
                        <p className="text-4xl font-semibold text-black font-parkinsans">100</p>
                    </div>
                    <span className="text-xs text-orange-600 font-semibold bg-orange-200 px-2 py-1 rounded">
                        +10% ↑
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">New Offers Received</p>
                        <p className="text-4xl font-semibold text-black font-parkinsans">20</p>
                    </div>
                    <span className="text-xs text-purple-600 font-semibold bg-purple-200 px-2 py-1 rounded">
                        +5% ↑
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Completed Orders</p>
                        <p className="text-4xl font-semibold text-black font-parkinsans">40</p>
                    </div>
                    <span className="text-xs text-green-600 font-semibold bg-green-200 px-2 py-1 rounded">
                        +15% ↑
                    </span>
                </div>
            </div>
        </div>
    );
}
