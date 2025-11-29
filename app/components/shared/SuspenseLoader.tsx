import React from "react";

export default function SuspenseLoader() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-[#144E42] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-parkinsans animate-pulse">Loading...</p>
        </div>
    );
}
