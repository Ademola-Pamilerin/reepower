import React, { useState } from "react";
import Image from "next/image";
import { Seller } from "../buy-requests/InterestedSellersList";

interface SellerMessageProps {
    seller: Seller;
}

export default function SellerMessage({ seller }: SellerMessageProps) {
    const [message, setMessage] = useState("");

    return (
        <div className="h-[600px] flex flex-col bg-gray-50 rounded-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <Image
                            src={seller.image}
                            alt={seller.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-black font-parkinsans">{seller.name}</h3>
                        <p className="text-xs text-green-600">Online</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="text-center text-xs text-gray-400 my-4">Tuesday, Jan 12</div>

                {/* Received Message */}
                <div className="flex gap-3 max-w-[80%]">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 mt-1">
                        <Image
                            src={seller.image}
                            alt={seller.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-sm text-gray-700 shadow-sm">
                            Hi, I saw your interest in my 50kg PET request.
                        </div>
                        <span className="text-[10px] text-gray-400 ml-1">9:41 AM</span>
                    </div>
                </div>

                {/* Sent Message */}
                <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 mt-1">
                        <Image
                            src="/images/buyer-image.png" // Placeholder for current user
                            alt="Me"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="bg-[#E7F6D4] p-3 rounded-2xl rounded-tr-none text-sm text-[#144E42] shadow-sm">
                            Hi, I saw your interest in my 50kg PET request. Can you deliver by tomorrow?
                        </div>
                        <span className="text-[10px] text-gray-400 mr-1 text-right block">9:42 AM</span>
                    </div>
                </div>

                {/* Received Message */}
                <div className="flex gap-3 max-w-[80%]">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 mt-1">
                        <Image
                            src={seller.image}
                            alt={seller.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-sm text-gray-700 shadow-sm">
                            Hi, I saw your interest in my 50kg PET request. Can you deliver by tomorrow?
                        </div>
                        <span className="text-[10px] text-gray-400 ml-1">9:45 AM</span>
                    </div>
                </div>

                {/* Sent Message */}
                <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 mt-1">
                        <Image
                            src="/images/buyer-image.png" // Placeholder for current user
                            alt="Me"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="bg-[#E7F6D4] p-3 rounded-2xl rounded-tr-none text-sm text-[#144E42] shadow-sm">
                            Hi, I saw your interest in my 50kg PET request. Can you deliver by tomorrow?
                        </div>
                        <span className="text-[10px] text-gray-400 mr-1 text-right block">9:46 AM</span>
                    </div>
                </div>
                <div className="flex justify-center my-4">
                    <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                        Can you deliver by tomorrow?
                    </span>
                </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2 items-center">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Write message..."
                            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#144E42] focus:ring-1 focus:ring-[#144E42] transition-all"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#144E42] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
