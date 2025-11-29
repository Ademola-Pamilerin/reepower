import React from "react";
import Image from "next/image"

interface ErrorMessageProps {
    message: string;
    className?: string;
}

export default function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
    return (
        <div
            className={`flex items-start gap-2 bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-4 py-3 rounded-lg text-sm ${className}`}
        >
            <Image
                src={"/images/error-img.png"}
                alt={"error-img"}
                width={24}
                height={24}
                className="object-cover"
            />
            <span className="font-medium font-parkinsans">{message}</span>
        </div>
    );
}
