import React from "react";

interface LoadingDotsProps {
    text?: string;
    className?: string;
}

export default function LoadingDots({ text = "Loading", className = "" }: LoadingDotsProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-[#144E42] rounded-full animate-bounce"></div>
            </div>
            {text && <p className="text-sm font-medium text-[#144E42] font-parkinsans">{text}</p>}
        </div>
    );
}
